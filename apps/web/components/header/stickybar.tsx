import { Container } from "@sk/ui";

export type StickybarProps = {
  catalogLabel?: string;
  searchPlaceholder?: string;
};

function BurgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="block w-5 h-5">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="block w-5 h-5">
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 21l-4.3-4.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalcIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="block w-5 h-5">
      <path
        d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 8h8M8 12h3M13 12h3M8 16h3M13 16h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="block w-5 h-5">
      <path
        d="M12 21s-7-4.6-9.5-8.7C.5 8.7 2.7 6 5.7 6c1.8 0 3.3 1 4.3 2.2C11 7 12.5 6 14.3 6c3 0 5.2 2.7 3.2 6.3C19 16.4 12 21 12 21z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="block w-5 h-5">
      <path d="M6 6h15l-2 9H7L6 6z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 6L5 3H2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="20" r="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="20" r="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="block w-5 h-5">
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 21a8 8 0 0 1 16 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Stickybar({
  catalogLabel = "каталог продукции",
  searchPlaceholder = "умный поиск и не только...",
}: StickybarProps) {
  const catalogText =
    catalogLabel.length > 0
      ? catalogLabel.charAt(0).toLowerCase() + catalogLabel.slice(1)
      : catalogLabel;

  const dockClass =
    "h-16 flex-1 rounded-[24px] bg-[#9caf88] p-2 pr-4 flex items-center gap-4 " +
    "border border-white/35 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]";

  const searchClass =
    "h-12 flex-1 rounded-[20px] bg-white/90 px-4 flex items-center gap-3 " +
    "border border-white/60 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset]";

  const iconBtn =
    "h-16 w-16 rounded-[24px] inline-flex items-center justify-center leading-none " +
    "border border-[#26292e]/15 bg-white/30 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] " +
    "text-[#26292e]/70";

  const iconBtnAccent =
    "h-16 w-16 rounded-[24px] inline-flex items-center justify-center leading-none " +
    "bg-[#9caf88] border border-white/35 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] text-white";

  return (
    <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md">
      <Container className="py-3">
        <div className="flex items-center gap-4">
          {/* Общая пилюля: каталог + поиск */}
          <div className={dockClass}>
            <button
              type="button"
              className="h-12 px-6 flex items-center gap-4 text-white font-semibold hover:opacity-90 transition leading-none"
              aria-label="Каталог продукции"
            >
              <span className="h-10 w-10 flex items-center justify-center leading-none">
                <BurgerIcon />
              </span>
              <span className="text-sm">{catalogText}</span>
            </button>

            <div className={searchClass}>
              <span className="text-[#9caf88] leading-none">
                <SearchIcon />
              </span>
              <input
                className="w-full bg-transparent outline-none text-sm text-[#26292e]/70 placeholder:text-[#26292e]/40"
                placeholder={searchPlaceholder}
              />
            </div>
          </div>

          {/* Иконки справа */}
          <div className="flex items-center gap-3">
            <button className={iconBtn} aria-label="Калькулятор расхода">
              <CalcIcon />
            </button>
            <button className={iconBtn} aria-label="Избранное">
              <HeartIcon />
            </button>
            <button className={iconBtn} aria-label="Корзина">
              <CartIcon />
            </button>
            <button className={iconBtnAccent} aria-label="Вход в ЛК">
              <UserIcon />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
