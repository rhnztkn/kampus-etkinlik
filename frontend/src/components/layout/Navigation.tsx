import { NavLink } from "react-router-dom";

interface MenuLink {
  to: string;
  label: string;
  exact?: boolean; // sadece bu adreste aktif olsun
}

// "/" her adresin başında olduğu için exact (NavLink'te end) gerekir
const MENU_LINKS: MenuLink[] = [
  { to: "/", label: "Ana Sayfa", exact: true },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

// NavLink açık sayfaya aria-current="page" ekler; CSS onu beyaz kutuyla gösterir
function Navigation() {
  return (
    <nav className="menu" aria-label="Ana menü">
      <ul>
        {MENU_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} end={link.exact}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
