"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@sk/ui";
import { Header } from "../../components/header";
import { SiteLogo } from "../../components/site-logo";
import { Footer } from "../../components/footer";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const LS_AUTH_KEY = "sk_auth_session_v1";

type AuthSession = {
  ok: true;
  login: string;
  role: "admin";
  createdAt: number;
};

export default function AuthPage() {
  const router = useRouter();

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const l = login.trim();
    const p = password;

    if (!l) {
      setError("Введите логин (почта или номер телефона).");
      return;
    }
    if (!p) {
      setError("Введите пароль.");
      return;
    }

    setLoading(true);
    try {
      // ВРЕМЕННО: без бэкенда. Создаём локальную сессию и пускаем в /admin.
      const session: AuthSession = {
        ok: true,
        login: l,
        role: "admin",
        createdAt: Date.now(),
      };
      localStorage.setItem(LS_AUTH_KEY, JSON.stringify(session));

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Не удалось выполнить вход. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

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

              <div className="mt-6 glass-border rounded-3xl bg-[#26292e]/[0.04] h-auto w-full p-8">
                <form className="h-full flex flex-col" onSubmit={handleSubmit}>
                  <div className="flex-1 flex flex-col gap-4 justify-center">
                    <div className="glass-border rounded-xl bg-white h-[64px] px-5 flex items-center">
                      <input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/60"
                        placeholder="Логин (email/номер телефона)"
                        autoComplete="username"
                        inputMode="text"
                      />
                    </div>

                    <div className="glass-border rounded-xl bg-white h-[64px] px-5 flex items-center gap-3">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent outline-none text-[16px] text-[#26292e] placeholder:text-[#26292e]/60"
                        placeholder="Пароль"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl text-[#26292e]/60 hover:text-[#26292e] transition-colors"
                        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                        title={showPassword ? "Скрыть пароль" : "Показать пароль"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" aria-hidden />
                        ) : (
                          <Eye className="h-5 w-5" aria-hidden />
                        )}
                      </button>
                    </div>

                    {error ? (
                      <div className="text-sm text-[#26292e]/70">
                        <span className="glass-border inline-block rounded-2xl bg-white/55 px-4 py-2">
                          {error}
                        </span>
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={loading}
                      className="glass-border rounded-xl bg-[#c6cf13] h-[64px] w-full font-semibold text-[#26292e] hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Входим...
                        </span>
                      ) : (
                        "Войти"
                      )}
                    </button>

                    <div className="mt-4 text-center text-[16px] text-[#26292e]/60">
                      Нет аккаунта?{" "}
                      <Link
                        href="/auth/register"
                        className="text-dark hover:text-accent1 transition-colors duration-500"
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
