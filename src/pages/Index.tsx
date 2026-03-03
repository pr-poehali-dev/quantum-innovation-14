import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/4cc29c86-b060-4bb9-a2ff-219b9674aae7.png";
const IMG_HERO = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/files/4365fb78-e5d0-49a1-98c2-7c3ccde61bba.jpg";
const IMG_KIDS = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/bd25b997-0ba5-4f38-a88f-b5f860ce7a90.jpg";
const IMG_GENDER = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/11e4363c-778b-40a6-a152-0f55e4ffaa4a.jpg";
const IMG_CANNON = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/c3a0b934-ca58-40f5-98e3-b8ef8a478a2e.jpg";
const IMG_ABOUT = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/b8c025cf-dcdf-4ed9-b97b-fbe38bfd78e5.jpg";

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/79537755111", color: "#25D366", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.882a.5.5 0 0 0 .614.614l6.037-1.471A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.933 0-3.742-.524-5.29-1.438l-.379-.224-3.932.958.975-3.932-.232-.385A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
  )},
  { label: "Telegram", href: "https://t.me/Pena_nsk", color: "#2AABEE", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
  )},
  { label: "VK", href: "https://vk.ru/djrenown", color: "#0077FF", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/></svg>
  )},
  { label: "Maxx", href: "https://maxx.ru/djrenown", color: "#FF4D00", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
  )},
];

const GALLERY_PHOTOS = [
  "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/3bb84ed0-a018-43df-a065-a236ffd1484f.jpg",
  "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/21216610-8e4b-4479-94b9-98169f09065a.jpg",
  "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/47c5acee-aecd-4184-8f35-bd5a9a01651d.jpg",
  "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/f3bd8942-b035-4f6d-b0f7-e0baf735cb38.jpg",
  "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/270d2163-f345-4080-9c0c-bc9f32526506.jpg",
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const repeated = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((p) => p !== null ? (p + 1) % GALLERY_PHOTOS.length : null);
      if (e.key === "ArrowLeft") setLightbox((p) => p !== null ? (p - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <span className="text-accent text-sm font-medium tracking-widest uppercase">Наши мероприятия</span>
        <h2 className="text-5xl font-display font-black mt-3 tracking-tighter">
          Галерея
        </h2>
      </div>

      {/* Бесконечная лента */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 w-max"
          style={{ animation: "gallery-scroll 30s linear infinite" }}
          onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; }}
          onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; }}
        >
          {repeated.map((src, i) => (
            <div
              key={i}
              className="w-72 h-52 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group relative"
              onClick={() => setLightbox(i % GALLERY_PHOTOS.length)}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Icon name="ZoomIn" size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={32} />
          </button>
          <button
            className="absolute left-4 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length); }}
          >
            <Icon name="ChevronLeft" size={40} />
          </button>
          <img
            src={GALLERY_PHOTOS[lightbox]}
            alt=""
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY_PHOTOS.length); }}
          >
            <Icon name="ChevronRight" size={40} />
          </button>
          <div className="absolute bottom-4 text-white/50 text-sm">{lightbox + 1} / {GALLERY_PHOTOS.length}</div>
        </div>
      )}

      <style>{`
        @keyframes gallery-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-${GALLERY_PHOTOS.length} * (18rem + 1rem))); }
        }
      `}</style>
    </section>
  );
};

const services = [
  {
    title: "ПЕННАЯ ПУШКА",
    subtitle: "Классическое пенное шоу",
    desc: "Есть повод зажечь не по-детски? Нашли место, позвали друзей, но не хватает крутой пены? Классическое пенное шоу и ничего лишнего!",
    icon: "Sparkles",
    img: IMG_CANNON,
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
  },
  {
    title: "ДЕТСКИЙ ДЕНЬ РОЖДЕНИЯ",
    subtitle: "Программа на 60 минут",
    desc: "Всё так же зажигаем не по-детски, но уже с детьми! Пенное шоу, аниматор и музыкальное сопровождение. Заказать легко!",
    icon: "PartyPopper",
    img: IMG_KIDS,
    color: "from-pink-500/20 to-purple-500/20",
    border: "border-pink-500/30",
  },
  {
    title: "ГЕНДЕР-ПАТИ",
    subtitle: "Раскрой интригу с цветной пеной",
    desc: "Ищете оригинальный способ узнать пол ребёнка? Вы даёте бумажку с УЗИ, а мы запускаем ГОЛУБУЮ или РОЗОВУЮ пену — такого ваши гости ещё не видели!",
    icon: "Heart",
    img: IMG_GENDER,
    color: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/30",
  },
];

const faqs = [
  {
    q: "Безопасно ли это?",
    a: "Наши пушки имеют несколько степеней защиты. Пена, как и вода, проводник электричества — поэтому безопасность стоит на первом месте.",
  },
  {
    q: "Какой концентрат вы используете?",
    a: "Только проверенный пенный концентрат, разработанный специально для пенных пушек. Закупаем на заводе напрямую у производителя — никаких подделок.",
  },
  {
    q: "Что будет с газоном?",
    a: "Наша пена не взаимодействует с растениями — цветами, деревьями, травой. После мероприятия остатки растворятся без следа.",
  },
  {
    q: "Как одеться на пенную вечеринку?",
    a: "Лёгкая одежда или купальник. Если лёгкая одежда вымокнет, после высыхания на ней не останется следов.",
  },
  {
    q: "Сколько времени работает пушка?",
    a: "Минимум — 15 минут, это 250 литров пенного раствора. Количество можно увеличивать сколько угодно. При большом числе гостей можно подключить две пушки.",
  },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Пенная пушка" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-display text-xl font-black tracking-tight text-white">
              ПЕНА-<span className="text-accent">НСК</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#services" className="text-white/60 hover:text-white transition-colors">Услуги</a>
            <a href="#about" className="text-white/60 hover:text-white transition-colors">О нас</a>
            <a href="#faq" className="text-white/60 hover:text-white transition-colors">FAQ</a>
            <a href="#contacts" className="text-white/60 hover:text-white transition-colors">Контакты</a>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 hover:border-white/30 transition-all hover:scale-110"
                style={{ color: s.color }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a
            href="tel:+79537755111"
            className="hidden md:flex px-5 py-2.5 bg-accent text-black font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all"
          >
            +7-953-775-51-11
          </a>
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            <a href="#services" className="text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>Услуги</a>
            <a href="#about" className="text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>О нас</a>
            <a href="#faq" className="text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>FAQ</a>
            <a href="#contacts" className="text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>Контакты</a>
            <a href="tel:+79537755111" className="text-accent font-bold">+7-953-775-51-11</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Пенная вечеринка" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-medium">Новосибирск · Ежедневно 09:00–23:00</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-display font-black leading-none mb-6 tracking-tighter">
              <span className="text-white">ПЕННАЯ</span>
              <br />
              <span className="text-accent">ВЕЧЕРИНКА</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-lg">
              Пенное шоу, которое взорвёт твой праздник. Для взрослых, детей и гендер-пати в Новосибирске.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+79537755111"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-accent text-black font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all"
              >
                <Icon name="Phone" size={20} />
                Позвонить
              </a>
              <a
                href="#services"
                className="flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-semibold text-lg rounded-full hover:border-white/60 hover:bg-white/10 transition-all"
              >
                Смотреть услуги
                <Icon name="ArrowDown" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* Gallery */}
      <GallerySection />

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">Что мы предлагаем</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black mt-3 tracking-tighter">
              Наши <span className="text-accent">услуги</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className={`relative rounded-3xl overflow-hidden border ${s.border} bg-gradient-to-br ${s.color} backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                      <Icon name={s.icon} size={18} className="text-accent" />
                    </div>
                    <span className="text-xs text-white/50 font-medium">{s.subtitle}</span>
                  </div>
                  <h3 className="text-xl font-display font-black mb-3 text-white">{s.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
                  <a
                    href="tel:+79537755111"
                    className="mt-5 w-full flex items-center justify-center gap-2 py-3 bg-accent/20 hover:bg-accent hover:text-black border border-accent/40 text-accent font-semibold text-sm rounded-xl transition-all"
                  >
                    Заказать
                    <Icon name="ArrowRight" size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / How it works */}
      <section id="about" className="py-24 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent text-sm font-medium tracking-widest uppercase">Заказ пенной пушки</span>
              <h2 className="text-5xl font-display font-black mt-3 mb-6 tracking-tighter">
                Дополним ваш праздник <span className="text-accent">фееричным финалом!</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Пушка работает столько, сколько нужно вам. Минимально — 15 минут, это 250 литров пенного раствора.
                При большом числе гостей, как на фестивале, можно применить две большие пушки — наполнение пеной будет быстрее и эффектнее.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Clock", label: "Работаем ежедневно", val: "09:00 – 23:00" },
                  { icon: "Droplets", label: "Минимум пены", val: "250 литров" },
                  { icon: "Users", label: "Для любых событий", val: "Любой масштаб" },
                  { icon: "ShieldCheck", label: "Безопасность", val: "Несколько степеней защиты" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <Icon name={item.icon} size={20} className="text-accent mb-2" />
                    <div className="text-xs text-white/50 mb-1">{item.label}</div>
                    <div className="text-sm font-semibold text-white">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-3xl" />
              <img
                src={IMG_ABOUT}
                alt="Пенная пушка"
                className="relative rounded-3xl w-full object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent text-black font-black text-2xl rounded-2xl px-6 py-4 shadow-xl">
                🎉 Зажги<br />с нами!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">Частые вопросы</span>
            <h2 className="text-5xl font-display font-black mt-3 tracking-tighter">
              FAQ
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/5"
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-accent flex-shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-white/70 leading-relaxed border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <img src={IMG_CANNON} alt="CTA" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            <div className="relative z-10 p-12 text-center">
              <h2 className="text-4xl lg:text-5xl font-display font-black mb-4 tracking-tighter text-white">
                Готовы устроить <span className="text-accent">пенный взрыв</span>?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Звоните — обсудим ваш праздник и подберём оптимальный формат
              </p>
              <a
                href="tel:+79537755111"
                className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-black font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all"
              >
                <Icon name="Phone" size={22} />
                +7-953-775-51-11
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-24 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">Как с нами связаться</span>
            <h2 className="text-5xl font-display font-black mt-3 tracking-tighter">
              Контакты
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-accent/40 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <Icon name="Phone" size={24} className="text-accent" />
              </div>
              <div className="text-white/50 text-sm mb-2">Телефон</div>
              <a href="tel:+79537755111" className="text-xl font-bold text-white hover:text-accent transition-colors">
                +7-953-775-51-11
              </a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-accent/40 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <Icon name="Mail" size={24} className="text-accent" />
              </div>
              <div className="text-white/50 text-sm mb-2">Email</div>
              <a href="mailto:suhininvyacheslav@gmail.com" className="text-base font-semibold text-white hover:text-accent transition-colors break-all">
                suhininvyacheslav@gmail.com
              </a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-accent/40 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} className="text-accent" />
              </div>
              <div className="text-white/50 text-sm mb-2">Часы работы</div>
              <div className="text-xl font-bold text-white">Ежедневно</div>
              <div className="text-accent font-semibold">09:00 – 23:00</div>
            </div>
          </div>

          <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Icon name="MapPin" size={20} className="text-accent" />
              <span className="text-white/50 text-sm">Адрес</span>
            </div>
            <div className="text-lg font-semibold text-white">Россия, Новосибирская область, г. Новосибирск</div>
            <div className="mt-4 text-white/40 text-sm">ИП Сухинина Т.С. · ИНН 541000739716</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Пена-НСК" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display font-bold text-white">ПЕНА-<span className="text-accent">НСК</span></span>
          </div>
          <div className="text-white/40 text-sm text-center">
            © 2025 ИП Сухинина Т.С. · Пенные вечеринки в Новосибирске
          </div>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 hover:border-white/30 transition-all hover:scale-110"
                style={{ color: s.color }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;