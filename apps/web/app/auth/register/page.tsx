"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@sk/ui";
import { Header } from "../../../components/header";
import { SiteLogo } from "../../../components/site-logo";
import { Footer } from "../../../components/footer";

type RegMode = "business" | "retail";
type BizType = "ooo" | "ip";

const RETAIL_OPTIONS = [
  "Сейчас делаю ремонт, нужны материалы",
  "Систематически занимаюсь ремонтными работами",
  "Закупаю материалы для бригады/объекта",
  "Покупаю для родственников/друзей",
  "Другое",
] as const;

export default function RegisterPage() {
  const [mode, setMode] = React.useState<RegMode>("business");
  const [bizType, setBizType] = React.useState<BizType>("ooo");
  const [retailReason, setRetailReason] = React.useState<(typeof RETAIL_OPTIONS)[number]>(
    RETAIL_OPTIONS[0],
  );

  return (
    <div>
      <Header
        logoSlot={<SiteLogo />}
        nav={[
          { label: "как заказать", href: "#how" },
          { label: "купить оптом", href: "#b2b" },
          { label: "дилерам", href: "#dealers" },
          { label: "блог и новости", href: "#blog" },
        ]}
        regionLabel="Ульяновск"
        phoneLabel="+7 (964) 858-99-10"
        phoneHref="tel:+79648589910"
      />

      <main className="py-6">
        <Container>
          <div className="min-h-[calc(100svh-560px)] flex items-center justify-center">
            <div className="w-full max-w-[1416px]">
              <div className="text-center">
                <div className="text-[22px] font-semibold text-[#26292e]">
                  Регистрация
                </div>
                <div className="mt-1 text-[16px] text-[#26292e]/60">
                  Заполните данные, чтобы создать аккаунт
                </div>
              </div>

              <div className="mt-6 glass-border rounded-3xl bg-[#26292e]/[0.04] h-auto w-full p-8">
                <form
                  className="h-full flex flex-col"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  {/* переключатель режима */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMode("business")}
                      className={[
                        "glass-border rounded-2xl px-4 py-2 text-sm font-semibold transition-colors duration-300",
                        mode === "business"
                          ? "bg-[#9caf88] text-[#26292e]"
                          : "bg-white/50 text-[#26292e]/60 hover:text-[#26292e]",
                      ].join(" ")}
                    >
                      Бизнес (ООО/ИП)
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode("retail")}
                      className={[
                        "glass-border rounded-2xl px-4 py-2 text-sm font-semibold transition-colors duration-300",
                        mode === "retail"
                          ? "bg-[#c6cf13] text-[#26292e]"
                          : "bg-white/50 text-[#26292e]/60 hover:text-[#26292e]",
                      ].join(" ")}
                    >
                      Розница
                    </button>
                  </div>

                  <div className="mt-6 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {mode === "business" ? (
                      <>
                        {/* тип бизнеса */}
                        <div className="glass-border rounded-2xl bg-white/35 p-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setBizType("ooo")}
                            className={[
                              "glass-border rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-300",
                              bizType === "ooo"
                                ? "bg-[#26292e] text-white"
                                : "bg-white/55 text-[#26292e]/60 hover:text-[#26292e]",
                            ].join(" ")}
                          >
                            ООО
                          </button>
                          <button
                            type="button"
                            onClick={() => setBizType("ip")}
                            className={[
                              "glass-border rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-300",
                              bizType === "ip"
                                ? "bg-[#26292e] text-white"
                                : "bg-white/55 text-[#26292e]/60 hover:text-[#26292e]",
                            ].join(" ")}
                          >
                            ИП
                          </button>
                          <div className="ml-auto text-xs text-[#26292e]/45 pr-2">
                            По умолчанию: Бизнес
                          </div>
                        </div>

                        {/* контакт (логин) */}
                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Почта или номер телефона"
                            autoComplete="username"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Пароль"
                            type="password"
                            autoComplete="new-password"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Название компании"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="ИНН"
                            inputMode="numeric"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder={bizType === "ooo" ? "ОГРН" : "ОГРНИП"}
                            inputMode="numeric"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Город"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Контактное лицо (ФИО)"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Имя"
                            autoComplete="given-name"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Фамилия"
                            autoComplete="family-name"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Город"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Почта или номер телефона"
                            autoComplete="username"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                          <input
                            className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                            placeholder="Пароль"
                            type="password"
                            autoComplete="new-password"
                          />
                        </div>

                        <div className="glass-border rounded-2xl bg-white/35 p-4">
                          <div className="text-sm font-semibold text-[#26292e]">
                            Расскажите, для чего приобретаете лакокрасочную продукцию?
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-2">
                            {RETAIL_OPTIONS.map((opt) => (
                              <label
                                key={opt}
                                className="glass-border rounded-2xl bg-white/55 px-4 py-3 flex items-center gap-3 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="retail_reason"
                                  checked={retailReason === opt}
                                  onChange={() => setRetailReason(opt)}
                                />
                                <span className="text-sm text-[#26292e]/80">{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="glass-border rounded-2xl bg-[#c6cf13] h-[64px] w-full font-semibold text-[#26292e] hover:opacity-90 transition"
                    >
                      Создать аккаунт
                    </button>

                    <div className="mt-4 text-center text-[16px] text-[#26292e]/60">
                      Уже есть аккаунт?{" "}
                      <Link
                        href="/auth"
                        className="text-[#26292e] hover:text-[#9caf88] transition-colors duration-500 font-semibold"
                      >
                        Войти
                      </Link>
                    </div>

                    <div className="mt-2 text-center text-xs text-[#26292e]/40">
                      Проверку почты/номера пока не делаем.
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer
        logoSrc="/logo1.png"
        contacts={{
          phoneLabel: "+7 (964) 858-99-10",
          phoneHref: "tel:+79648589910",
          emailLabel: "simkraski@bk.ru",
          emailHref: "mailto:simkraski@bk.ru",
          addressLabel: "г. Ульяновск, Московское шоссе 24Д",
          hoursLabel: "Пн-Пт: 8:00 – 18:00",
        }}
        columns={[
          {
            title: "Компания",
            links: [
              { label: "О компании", href: "/about" },
              { label: "Новости", href: "/news" },
              { label: "Акции", href: "/sale" },
              { label: "Вакансии", href: "/jobs" },
              { label: "Контакты", href: "/contacts" },
            ],
          },
          {
            title: "Каталог",
            links: [
              { label: "Краски для интерьера", href: "/catalog/interior" },
              { label: "Краски для фасада", href: "/catalog/facade" },
              { label: "Для дерева и металла", href: "/catalog/wood-metal" },
              { label: "Грунтовки и шпатлевки", href: "/catalog/primers" },
              { label: "Инструменты", href: "/catalog/tools" },
            ],
          },
          {
            title: "Помощь",
            links: [
              { label: "Как заказать", href: "/help/how-to-order" },
              { label: "Доставка и оплата", href: "/help/shipping" },
              { label: "Возврат товара", href: "/help/returns" },
              { label: "Частые вопросы", href: "/help/faq" },
              { label: "Бонусная программа", href: "/help/bonus" },
            ],
          },
        ]}
        legalLinks={[
          { label: "Политика конфиденциальности", href: "/legal/privacy" },
          { label: "Пользовательское соглашение", href: "/legal/terms" },
          { label: "Обработка персональных данных", href: "/legal/personal-data" },
          { label: "Сообщить об ошибке/о пожелании", href: "/feedback" },
        ]}
        inn="1234567890"
        ogrn="1234567890123"
      />
    </div>
  );
}
