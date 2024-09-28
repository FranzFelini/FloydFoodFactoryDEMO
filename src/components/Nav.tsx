const LINKS = [
  {
    label: "Reservations",
    href: "#reservations",
  },
  {
    label: "Menu",
    href: "#menu",
  },
  {
    label: "Prices",
    href: "/meni.pdf",
  },
  {
    label: "About",
    href: "#about",
  },
];

export function Nav() {
  return (
    <div className="flex justify-center gap-8 p-3 text-white no-underline font-medium bg-black">
      {LINKS.map((link) => {
        return (
          <a
            key={link.href}
            href={link.href}
            className="cursor-pointer px-2 py-1 bg-black no-underline text-white"
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
