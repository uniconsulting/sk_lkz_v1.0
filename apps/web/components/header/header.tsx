import { Stickybar } from './stickybar';
import { Topbar, type TopNavItem } from './topbar';

export type HeaderProps = {
  logoSlot?: React.ReactNode;
  nav: TopNavItem[];
  regionLabel: string;
  phoneLabel: string;
  phoneHref: string;
};

export function Header(props: HeaderProps) {
  return (
    <header className="w-full">
      <Topbar {...props} />
      <Stickybar />
    </header>
  );
}
