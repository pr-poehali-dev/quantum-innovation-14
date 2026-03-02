import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/4cc29c86-b060-4bb9-a2ff-219b9674aae7.png";
const IMG_HERO = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/files/4365fb78-e5d0-49a1-98c2-7c3ccde61bba.jpg";
const IMG_KIDS = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/bd25b997-0ba5-4f38-a88f-b5f860ce7a90.jpg";
const IMG_GENDER = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/11e4363c-778b-40a6-a152-0f55e4ffaa4a.jpg";
const IMG_CANNON = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/c3a0b934-ca58-40f5-98e3-b8ef8a478a2e.jpg";
const IMG_ABOUT = "https://cdn.poehali.dev/projects/286124bd-9c67-48e5-aaae-0d311c22057e/bucket/b8c025cf-dcdf-4ed9-b97b-fbe38bfd78e5.jpg";

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
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Пена-НСК" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display font-bold text-white">ПЕНА-<span className="text-accent">НСК</span></span>
          </div>
          <div className="text-white/40 text-sm text-center">
            © 2024 ИП Сухинина Т.С. · Пенные вечеринки в Новосибирске
          </div>
          <a href="tel:+79537755111" className="text-accent font-semibold hover:text-white transition-colors">
            +7-953-775-51-11
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Index;