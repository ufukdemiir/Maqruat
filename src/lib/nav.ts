export interface NavItem {
  href: string;
  label: string;
}

// Üst menüde (Header.astro) ve footer'daki site haritasında (Footer.astro)
// BİREBİR AYNI liste kullanılır. Yeni bir bölüm/sayfa eklediğinizde tek
// yapmanız gereken bu listeyi güncellemek — iki menünün birbirinden
// habersizce farklılaşması (biri güncellenip diğerinin unutulması) böylece
// mümkün olmaz.
export const navItems: NavItem[] = [
  { href: "/kitaplar/", label: "Kitaplar" },
  { href: "/yazarlar/", label: "Yazarlar" },
  { href: "/alintilar/", label: "Alıntılar" },
  { href: "/incelemeler/", label: "İncelemeler" },
  { href: "/notlar/", label: "Notlar" },
  { href: "/blog/", label: "Blog" },
  { href: "/istatistikler/", label: "İstatistikler" },
  { href: "/arsiv/", label: "Arşiv" },
];
