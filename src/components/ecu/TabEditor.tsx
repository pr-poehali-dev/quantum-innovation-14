import Icon from "@/components/ui/icon";
import { LangEntry } from "./types";

type Props = {
  entries: LangEntry[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
  onUpdateTranslation: (id: number, text: string) => void;
};

export default function TabEditor({ entries, selectedId, setSelectedId, onUpdateTranslation }: Props) {
  const selectedEntry = entries.find(e => e.id === selectedId);

  return (
    <div className="animate-slide-in-up grid grid-cols-[280px_1fr] gap-4">
      {/* Left: mini list */}
      <div className="rounded border border-[#1a2a38] overflow-hidden">
        <div className="text-xs font-['IBM_Plex_Mono'] text-[#2a5a6a] border-b border-[#1a2a38] bg-[#080f14] px-3 py-2">
          СТРОКИ ПЕРЕВОДА
        </div>
        <div className="max-h-[520px] overflow-y-auto">
          {entries.map(entry => (
            <div
              key={entry.id}
              onClick={() => setSelectedId(entry.id)}
              className={`px-3 py-2.5 border-b border-[#0d1e2a] cursor-pointer transition-colors ${
                selectedId === entry.id
                  ? "bg-[#00ff88]/8 border-l-2 border-l-[#00ff88]"
                  : "hover:bg-[#0f2030]"
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#00ff88]/60">{entry.address}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${entry.status === "translated" ? "bg-[#00ff88]" : "bg-[#fbbf24]"}`} />
              </div>
              <p className="text-xs text-[#e8c87a] font-['IBM_Plex_Mono'] truncate">{entry.original}</p>
              {entry.translated && <p className="text-[10px] text-[#8ab8c8] truncate mt-0.5">{entry.translated}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Right: editor panel */}
      <div className="flex flex-col gap-3">
        {selectedEntry ? (
          <>
            <div className="p-4 rounded border border-[#1a2a38] bg-[#090f15]">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="MapPin" size={14} className="text-[#00ff88]" />
                <span className="font-['IBM_Plex_Mono'] text-sm text-[#00ff88]">{selectedEntry.address}</span>
                <span className="text-xs text-[#2a4a5a] font-['IBM_Plex_Mono']">{selectedEntry.bytes} байт</span>
              </div>

              <div className="mb-4">
                <label className="text-[10px] font-['IBM_Plex_Mono'] text-[#4a6a7a] tracking-widest uppercase block mb-2">
                  Оригинал (японский)
                </label>
                <div className="px-3 py-2.5 rounded border border-[#1a2a38] bg-[#060c10] font-['IBM_Plex_Mono'] text-[#e8c87a] text-sm amber-glow">
                  {selectedEntry.original}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[10px] font-['IBM_Plex_Mono'] text-[#4a6a7a] tracking-widest uppercase block mb-2">
                  Перевод (русский)
                </label>
                <input
                  value={selectedEntry.translated}
                  onChange={e => onUpdateTranslation(selectedEntry.id, e.target.value)}
                  placeholder="Введите перевод на русском..."
                  className="w-full px-3 py-2.5 rounded border border-[#1a3a2a] bg-[#060c10] text-white text-sm outline-none focus:border-[#00ff88]/40 focus:bg-[#061210] transition-colors placeholder-[#2a4a5a] font-['IBM_Plex_Mono']"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const idx = entries.findIndex(e => e.id === selectedEntry.id);
                    if (idx > 0) setSelectedId(entries[idx - 1].id);
                  }}
                  className="px-3 py-2 rounded border border-[#1a2a38] text-xs text-[#4a6a7a] hover:text-white hover:border-[#2a4a5a] transition-colors flex items-center gap-1"
                >
                  <Icon name="ChevronUp" size={12} /> Предыдущая
                </button>
                <button
                  onClick={() => {
                    const idx = entries.findIndex(e => e.id === selectedEntry.id);
                    if (idx < entries.length - 1) setSelectedId(entries[idx + 1].id);
                  }}
                  className="px-3 py-2 rounded border border-[#1a2a38] text-xs text-[#4a6a7a] hover:text-white hover:border-[#2a4a5a] transition-colors flex items-center gap-1"
                >
                  Следующая <Icon name="ChevronDown" size={12} />
                </button>
                <button
                  onClick={() => onUpdateTranslation(selectedEntry.id, "")}
                  className="px-3 py-2 rounded border border-[#3a1a1a] text-xs text-[#8a4a4a] hover:text-[#ff8888] transition-colors ml-auto flex items-center gap-1"
                >
                  <Icon name="Trash2" size={12} /> Очистить
                </button>
              </div>
            </div>

            {/* Hex preview */}
            <div className="p-4 rounded border border-[#1a2a38] bg-[#090f15]">
              <div className="text-[10px] font-['IBM_Plex_Mono'] text-[#2a5a6a] tracking-widest uppercase mb-2">HEX-ДАМП</div>
              <div className="font-['IBM_Plex_Mono'] text-[11px] text-[#4a8a6a] leading-relaxed">
                {Array.from(selectedEntry.original).map((ch, i) => (
                  <span key={i} className="mr-1">{ch.charCodeAt(0).toString(16).padStart(4, "0").toUpperCase()}</span>
                ))}
              </div>
              {selectedEntry.translated && (
                <>
                  <div className="h-px bg-[#1a2a38] my-2" />
                  <div className="font-['IBM_Plex_Mono'] text-[11px] text-[#4a7a8a] leading-relaxed">
                    {Array.from(selectedEntry.translated).map((ch, i) => (
                      <span key={i} className="mr-1">{ch.charCodeAt(0).toString(16).padStart(4, "0").toUpperCase()}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 rounded border border-dashed border-[#1a2a38] text-[#2a4a5a]">
            <Icon name="PenLine" size={32} className="mb-3 text-[#1a3a4a]" />
            <p className="text-sm">Выберите строку для редактирования</p>
          </div>
        )}
      </div>
    </div>
  );
}
