"use client";

import { Container } from "@sk/ui";
import { Header } from "../components/header";
import { SiteLogo } from "../components/site-logo";
import { HomeBanner } from "../components/home-banner";
import { HomeCategories } from "../components/home-categories";
import { HomeProductsGrid } from "../components/home-products-grid";
import { Footer } from "../components/footer";

export default function HomePage() {
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
        <Container className="space-y-6">
          <HomeBanner />
          <HomeCategories />
          <HomeProductsGrid />
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
