"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/post", label: "Post" },
  ];

  return (
    <nav>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.href} className="min-w-12">
            <Link
              href={link.href}
              className={`inline-block transition-transform duration-300 hover:scale-110 ${
                currentPath === link.href ? "font-bold" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
