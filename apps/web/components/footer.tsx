import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@sk/ui";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

type FooterLink = { label: string; href: string };

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type FooterContacts = {
  phoneLabel: string;
  phoneHref: string;
  emailLabel: string;
  emailHref: string;
  addressLabel: string;
  hoursLabel: string;
};

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function Footer({
  logoSrc = "/logo1.png",
  contacts,
  columns,
  legalLinks,
  year = new Date().getFullYear(),
  companyName = "Симбирские краски",
  inn = "1234567890",
  ogrn = "1234567890123",
}: {
  logoSrc?: string;
  contacts: FooterContacts;
  columns: FooterColumn[];
  legalLinks: FooterLink[];
  year?: number;
  companyName?: string;
  inn?: string;
  ogrn?: string;
}) {
  return (
    <footer className="bg-[#26292e] text-white">
      <Container className="pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16">
          {/* Левая колонка: лого + контакты */}
          <div className="flex flex-col gap-7">
            {/* Лого ровно по левой направляющей */}
            <div className="block">
              <Image
                src={withBasePath(logoSrc)}
                alt={companyName}
                width={210}
                height={60}
                priority={false}
                className="h-12 w-auto invert brightness-0"
              />
            </div>

            {/* Контакты: фикс колонка под иконку, текст всегда в одной вертикали */}
            <div className="flex flex-col gap-4 text-[16px]">
              <a
                href={contacts.phoneHref}
                className="grid grid-cols-[28px_1fr] items-center gap-4 text-white/90 hover:text-[#c6cf13] transition-colors duration-500"
              >
                <Phone className="h-6 w-6 text-white/75" />
                <span className="font-semibold leading-snug">
                  {contacts.phoneLabel}
                </span>
              </a>

              <a
                href={contacts.emailHref}
                className="grid grid-cols-[28px_1fr] items-center gap-4 text-white/90 hover:text-[#c6cf13] transition-colors duration-500"
              >
                <Mail className="h-6 w-6 text-white/75" />
                <span className="font-semibold leading-snug">
                  {contacts.emailLabel}
                </span>
              </a>

              <div className="grid grid-cols-[28px_1fr] items-center gap-4 text-white/90">
                <MapPin className="h-6 w-6 text-white/75" />
                <span className="font-semibold leading-snug">
                  {contacts.addressLabel}
                </span>
              </div>

              <div className="grid grid-cols-[28px_1fr] items-center gap-4 text-white/90">
                <Clock className="h-6 w-6 text-white/75" />
                <span className="font-semibold leading-snug">
                  {contacts.hoursLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Правая часть: 3 колонки */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-14">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-[22px] font-semibold text-white/95">
                  {col.title}
                </div>

                <ul className="mt-6 space-y-4">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[16px] text-white/80 hover:text-[#c6cf13] transition-colors duration-500"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Юридические ссылки (ряд с точками) */}
        <div className="mt-16 flex flex-wrap items-center gap-y-3 text-[16px]">
          {legalLinks.map((l, idx) => (
            <React.Fragment key={l.href}>
              <Link
                href={l.href}
                className="font-semibold text-white/90 hover:text-[#c6cf13] transition-colors duration-500"
              >
                {l.label}
              </Link>

              {idx !== legalLinks.length - 1 && (
                <span
                  aria-hidden
                  className="mx-6 inline-block h-2 w-2 rounded-full bg-[#9caf88] opacity-90"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>

      {/* Нижняя полоса */}
      <div className="border-t border-white/10">
        <Container className="py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-[16px] text-white/35">
            <div>
              © {year} {companyName}. Все права защищены.
            </div>
            <div className="text-white/25">
              ИНН:{inn} | ОГРН:{ogrn}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
