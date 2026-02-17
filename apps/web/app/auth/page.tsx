"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@sk/ui";
import { Header } from "../../components/header";
import { SiteLogo } from "../../components/site-logo";
import { Footer } from "../../components/footer";

export default function AuthPage() {
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

      <main className="py-4">
        <Container>
          <div className="min-h-[calc(100svh-260px)] flex items-center justify-center">
            <div className="w-full max-w-[660px]">
              <div className="text-center">
                <div className="text-[22px] font-semibold text-[#26292e]">
                  Вход в аккаунт
                </div>
                <div className="mt-1 text-[16px] text-[#26292e]/60">
                  Введите свои данные для входа
                </div>
              </div>

              <div className="mt-6 glass-border rounded-3xl bg-[#26292e]/[0.04] h-[320px] w-full p-8">
                <form
                  className="h-full flex flex-col"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex-1 flex flex-col gap-4 justify-center">
                    <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                      <input
                        className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                        placeholder="Логин (email/номер телефона)"
                        autoComplete="username"
                        inputMode="email"
                      />
                    </div>

                    <div className="glass-border rounded-2xl bg-white h-[64px] px-5 flex items-center">
                      <input
                        className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/40"
                        placeholder="Пароль"
                        type="password"
                        autoComplete="current-password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="glass-border rounded-2xl bg-[#c6cf13] h-[64px] w-full font-semibold text-[#26292e] hover:opacity-90 transition"
                    >
                      Войти
                    </button>

                    <div className="text-center text-[16px] text-[#26292e]/60">
                      Нет аккаунта?{" "}
                      <Link
                        href="/auth/register"
                        className="mt-1 text-[#26292e] hover:text-[#9caf88] transition-colors duration-500 font-semibold"
                      >
                        Зарегистрироваться
                      </Link>
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
