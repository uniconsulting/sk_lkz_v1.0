import { Container } from '@sk/ui';

export type StickybarProps = {
  catalogLabel?: string;
  searchPlaceholder?: string;
};

function BurgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CalcIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8h8M8 12h3M13 12h3M8 16h3M13 16h3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5">
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
    <svg width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M6 6h15l-2 9H7L6 6z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 6L5 3H2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="20" r="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M4 21a8 8 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Stickybar({
  catalogLabel = 'Каталог продукции',
  searchPlaceholder = 'умный поиск и не только...',
}: StickybarProps) {
  return (
    <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md">
      <Container className="py-3">
        <div className="flex items-center gap-4">
          {/* Общая пилюля: только каталог + поиск */}
          <div className="header-dock glass-border h-16 rounded-3xl p-2 flex items-center gap-4 flex-1">
            {/* Каталог без отдельного фона */}
            <button
              type="button"
              className="h-12 px-5 flex items-center gap-4 text-white font-semibold tracking-wide hover:opacity-90 transition"
              aria-label="Каталог продукции"
            >
              <span className="h-10 w-10 flex items-center justify-center">
                <BurgerIcon />
              </span>
              <span className="text-sm">{catalogLabel}</span>
            </button>

            {/* Поиск: белая капсула внутри, равные отступы */}
            <div className="header-search glass-border h-12 flex-1 rounded-[20px] px-4 flex items-center gap-3">
              <span className="text-accent1">
                <SearchIcon />
              </span>
              <input
                className="w-full bg-transparent outline-none text-sm text-fg placeholder:text-fg/40"
                placeholder={searchPlaceholder}
              />
            </div>
          </div>

          {/* Иконки справа: квадратные, радиус 24, высота как у пилюли */}
          <div className="flex items-center gap-3">
            <button className="header-icon glass-border h-16 w-16 rounded-3xl inline-flex items-center justify-center text-fg/70" aria-label="Калькулятор расхода">
              <CalcIcon />
            </button>
            <button className="header-icon glass-border h-16 w-16 rounded-3xl inline-flex items-center justify-center text-fg/70" aria-label="Избранное">
              <HeartIcon />
            </button>
            <button className="header-icon glass-border h-16 w-16 rounded-3xl inline-flex items-center justify-center text-fg/70" aria-label="Корзина">
              <CartIcon />
            </button>
            <button className="header-icon header-icon--accent glass-border h-16 w-16 rounded-3xl inline-flex items-center justify-center text-white" aria-label="Вход в ЛК">
              <UserIcon />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
