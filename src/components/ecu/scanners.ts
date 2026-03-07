import { LangEntry, ScanMode } from "./types";

// Диапазоны японских символов Unicode
function isJapanese(code: number): boolean {
  return (
    (code >= 0x3000 && code <= 0x9fff) ||  // CJK, хирагана, катакана, кандзи
    (code >= 0xf900 && code <= 0xfaff) ||  // CJK совместимые иероглифы
    (code >= 0xff00 && code <= 0xffef)     // Полноширинные символы
  );
}

// Поиск UTF-16LE строк (наиболее частый формат в японских ECU)
function scanUtf16LE(buf: Uint8Array, minLen = 2): LangEntry[] {
  const results: LangEntry[] = [];
  let i = 0;
  while (i < buf.length - 1) {
    const code = buf[i] | (buf[i + 1] << 8);
    if (isJapanese(code)) {
      const start = i;
      let str = "";
      while (i < buf.length - 1) {
        const c = buf[i] | (buf[i + 1] << 8);
        if (!isJapanese(c) && c !== 0x0020 && c !== 0x3000) break;
        if (c === 0x0000) break;
        str += String.fromCharCode(c);
        i += 2;
      }
      if (str.trim().length >= minLen) {
        const addr = "0x" + start.toString(16).toUpperCase().padStart(8, "0");
        results.push({ id: 0, address: addr, original: str.trim(), translated: "", bytes: i - start, status: "pending" });
      }
    } else {
      i += 2;
    }
  }
  return results;
}

// Поиск UTF-16BE строк
function scanUtf16BE(buf: Uint8Array, minLen = 2): LangEntry[] {
  const results: LangEntry[] = [];
  let i = 0;
  while (i < buf.length - 1) {
    const code = (buf[i] << 8) | buf[i + 1];
    if (isJapanese(code)) {
      const start = i;
      let str = "";
      while (i < buf.length - 1) {
        const c = (buf[i] << 8) | buf[i + 1];
        if (!isJapanese(c) && c !== 0x0020 && c !== 0x3000) break;
        if (c === 0x0000) break;
        str += String.fromCharCode(c);
        i += 2;
      }
      if (str.trim().length >= minLen) {
        const addr = "0x" + start.toString(16).toUpperCase().padStart(8, "0");
        results.push({ id: 0, address: addr, original: str.trim(), translated: "", bytes: i - start, status: "pending" });
      }
    } else {
      i += 2;
    }
  }
  return results;
}

// Поиск UTF-8 японских строк
function scanUtf8(buf: Uint8Array, minLen = 2): LangEntry[] {
  const results: LangEntry[] = [];
  let i = 0;
  while (i < buf.length) {
    // 3-байтный UTF-8 символ (основные японские блоки)
    if (buf[i] >= 0xe3 && buf[i] <= 0xef && (buf[i + 1] & 0xc0) === 0x80) {
      const start = i;
      const chars: number[] = [];
      while (i < buf.length - 2) {
        if (!(buf[i] >= 0xe3 && buf[i] <= 0xef && (buf[i + 1] & 0xc0) === 0x80 && (buf[i + 2] & 0xc0) === 0x80)) break;
        const cp = ((buf[i] & 0x0f) << 12) | ((buf[i + 1] & 0x3f) << 6) | (buf[i + 2] & 0x3f);
        if (!isJapanese(cp)) break;
        chars.push(cp);
        i += 3;
      }
      if (chars.length >= minLen) {
        const str = chars.map(c => String.fromCharCode(c)).join("");
        const addr = "0x" + start.toString(16).toUpperCase().padStart(8, "0");
        results.push({ id: 0, address: addr, original: str, translated: "", bytes: i - start, status: "pending" });
      }
    } else {
      i++;
    }
  }
  return results;
}

// Shift-JIS таблица (упрощённая, основные блоки)
 
const SJIS_RANGES: [number, number][] = [
  [0xa1, 0xdf],   // Полуширинная катакана
  [0x8140, 0x9ffc], // 2-байтные символы блок 1
  [0xe040, 0xeaa4], // 2-байтные символы блок 2
];

function isSjisLead(b: number): boolean {
  return (b >= 0x81 && b <= 0x9f) || (b >= 0xe0 && b <= 0xef);
}

function isSjisTrail(b: number): boolean {
  return (b >= 0x40 && b <= 0x7e) || (b >= 0x80 && b <= 0xfc);
}

function isHalfKana(b: number): boolean {
  return b >= 0xa1 && b <= 0xdf;
}

function scanShiftJIS(buf: Uint8Array, minLen = 2): LangEntry[] {
  const results: LangEntry[] = [];
  const decoder = new TextDecoder("shift-jis", { fatal: false });
  let i = 0;
  while (i < buf.length) {
    if (isSjisLead(buf[i]) || isHalfKana(buf[i])) {
      const start = i;
      const raw: number[] = [];
      while (i < buf.length) {
        if (isSjisLead(buf[i]) && i + 1 < buf.length && isSjisTrail(buf[i + 1])) {
          raw.push(buf[i], buf[i + 1]);
          i += 2;
        } else if (isHalfKana(buf[i])) {
          raw.push(buf[i]);
          i++;
        } else {
          break;
        }
      }
      if (raw.length >= minLen * 2) {
        try {
          const str = decoder.decode(new Uint8Array(raw)).trim();
          if (str.length >= minLen && /[\u3000-\u9fff\uff00-\uffef]/.test(str)) {
            const addr = "0x" + start.toString(16).toUpperCase().padStart(8, "0");
            results.push({ id: 0, address: addr, original: str, translated: "", bytes: raw.length, status: "pending" });
          }
        } catch (_e) {
          // невалидный Shift-JIS, пропускаем
        }
      }
    } else {
      i++;
    }
  }
  return results;
}

// Дедупликация по адресу (берём наиболее длинную строку)
function dedup(entries: LangEntry[]): LangEntry[] {
  const map = new Map<string, LangEntry>();
  for (const e of entries) {
    const existing = map.get(e.address);
    if (!existing || e.original.length > existing.original.length) {
      map.set(e.address, e);
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    parseInt(a.address, 16) - parseInt(b.address, 16)
  ).map((e, i) => ({ ...e, id: i + 1 }));
}

export type ScanResult = {
  entries: LangEntry[];
  log: string[];
};

export function runScanOnBuffer(
  buf: Uint8Array,
  mode: ScanMode,
  minLen: number,
  onProgress: (pct: number, log: string[]) => void,
  onDone: (result: ScanResult) => void,
) {
  const log: string[] = [];

  setTimeout(() => {
    log.push(`Файл: ${buf.length.toLocaleString()} байт`);
    onProgress(10, [...log]);
  }, 50);

  setTimeout(() => {
    let all: LangEntry[] = [];

    if (mode === "sjis" || mode === "all") {
      const r = scanShiftJIS(buf, minLen);
      log.push(`Shift-JIS: найдено ${r.length} строк`);
      all = all.concat(r);
    }
    onProgress(50, [...log]);

    if (mode === "utf16le" || mode === "all") {
      const r = scanUtf16LE(buf, minLen);
      log.push(`UTF-16LE: найдено ${r.length} строк`);
      all = all.concat(r);
    }
    onProgress(70, [...log]);

    if (mode === "utf16be" || mode === "all") {
      const r = scanUtf16BE(buf, minLen);
      log.push(`UTF-16BE: найдено ${r.length} строк`);
      all = all.concat(r);
    }
    onProgress(85, [...log]);

    if (mode === "utf8" || mode === "all") {
      const r = scanUtf8(buf, minLen);
      log.push(`UTF-8: найдено ${r.length} строк`);
      all = all.concat(r);
    }

    const deduped = dedup(all);
    log.push(`Итого уникальных адресов: ${deduped.length}`);
    onProgress(100, [...log]);

    setTimeout(() => {
      onDone({ entries: deduped, log: [...log] });
    }, 300);
  }, 200);
}
