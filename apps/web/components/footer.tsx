"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@sk/ui";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

type FooterLink = { label: string; href: string };

type FooterContacts = {
  phoneLabel: string;
  phoneHref: string;
  emailLabel: string;
  emailHref: string;
  addressLabel: string;
  hoursLabel: string;
};

export type FooterProps = {
  logoSrc: string;
  contacts: FooterContacts;
  columns: { title: string; links: FooterLink[] }[];
  legalLinks: FooterLink[];
  inn?: string;
  ogrn?: string;
};

function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function Footer({
  logoSrc,
  contacts,
  columns,
  legalLinks,
  inn,
  ogrn,
}: FooterProps) {
  return (
    <footer className="w-full bg-[#26292e] text-white">
      {/* ВАЖНО: один Container на весь футер, без вложенных px */}
      <Container className="pt-12">
        {/* Верхняя часть */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-y-12 gap-x-16">
          {/* Левая колонка: лого + контакты */}
          <div className="flex flex-col items-start">
            <Image
              src={withBasePath(logoSrc)}
              alt="СИМБИРСКИЕ КРАСКИ"
              width={220}
              height={72}
              priority
              className="h-14 w-auto"
            />

            <div className="mt-10 flex flex-col gap-5 text-[18px] leading-snug text-white/90">
              <a
                href={contacts.phoneHref}
                className="grid grid-cols-[24px_1fr] items-center gap-x-4 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 text-white/90" aria-hidden />
                <span className="font-semibold">{contacts.phoneLabel}</span>
              </a>

              <a
                href={contacts.emailHref}
                className="grid grid-cols-[24px_1fr] items-center gap-x-4 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 text-white/90" aria-hidden />
                <span className="font-semibold">{contacts.emailLabel}</span>
              </a>

              <div className="grid grid-cols-[24px_1fr] items-center gap-x-4">
                <MapPin className="h-5 w-5 text-white/90" aria-hidden />
                <span className="font-semibold">{contacts.addressLabel}</span>
              </div>

              <div className="grid grid-cols-[24px_1fr] items-center gap-x-4">
                <Clock className="h-5 w-5 text-white/90" aria-hidden />
                <span className="font-semibold">{contacts.hoursLabel}</span>
              </div>
            </div>
          </div>

          {/* Правая часть: 3 колонки ссылок */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-16">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <div className="text-[24px] font-semibold text-white">
                  {col.title}
                </div>

                <ul className="mt-8 flex flex-col gap-4 text-[18px] text-white/75">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="hover:text-white transition-colors"
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

        {/* Legal-ссылки: строго слева, под всем контентом */}
        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 text-[18px] text-white/80">
          {legalLinks.map((l, idx) => (
            <React.Fragment key={l.href}>
              <Link href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </Link>
              {idx !== legalLinks.length - 1 ? (
                <span aria-hidden className="text-[#9caf88]">
                  •
                </span>
              ) : null}
            </React.Fragment>
          ))}
        </div>

        {/* Разделитель */}
        <div className="mt-8 border-t border-white/15" />

        {/* Нижняя строка */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[18px] text-white/35">
          <div>© 2026 Симбирские краски. Все права защищены.</div>
          <div className="sm:text-right">
            {inn ? `ИНН:${inn}` : null}
            {inn && ogrn ? " | " : null}
            {ogrn ? `ОГРН:${ogrn}` : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
