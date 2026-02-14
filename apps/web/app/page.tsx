"use client";

import { Container } from "@sk/ui";
import { Header } from "../components/header";
import { SiteLogo } from "../components/site-logo";
import { HomeBanner } from "../components/home-banner";

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
        <Container>
          <HomeBanner />
        </Container>
      </main>
    </div>
  );
}

