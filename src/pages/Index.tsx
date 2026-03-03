import { useState } from "react";
import Icon from "@/components/ui/icon";
import Header from "./Header";
import GallerySection from "./GallerySection";
import ReviewsSection from "./ReviewsSection";
import Footer from "./Footer";
import { IMG_HERO, IMG_ABOUT, IMG_CANNON, services, faqs } from "./constants";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      <Header />

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

      {/* About */}
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

      <ReviewsSection />

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

      <Footer />

    </div>
  );
};

export default Index;