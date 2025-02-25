"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  isMobile: boolean;
  onLinkClick?: () => void;
}

export default function Nav({ isMobile, onLinkClick }: NavProps) {
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/tech", label: "Tech" },
    { href: "/music", label: "Music" },
    { href: "/three", label: "Three.JS" },
    { href: "/periodictable", label: "Periodic Table" },
  ];

  return (
    <nav>
      <ul
        className={`${
          isMobile ? "flex flex-col space-y-2 px-4 py-2" : "flex space-x-6"
        }`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block transition-transform duration-300 hover:scale-110 ${
                currentPath === link.href ? "font-bold" : ""
              }`}
              onClick={() => onLinkClick && onLinkClick()}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
