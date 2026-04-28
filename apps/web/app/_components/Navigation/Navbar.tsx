"use client";

//TODO: dodać prawdziwe logo

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Warsztaty", href: "/warsztaty" },
    { name: "Projekty", href: "/projekty" },
    { name: "Materiały", href: "/materialy" },
    { name: "Aktualności", href: "/aktualnosci" },
    { name: "Wesprzyj nas", href: "/wesprzyj-nas" },
    { name: "O nas", href: "/o-nas" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  return (
    <div className="sticky top-0 z-40 flex justify-center px-4 py-3">
      <nav className="flex items-center gap-6 border-secondary rounded-full px-6 py-2 relative border-0 shadow-md bg-brand-soft">
        <Link href="/" className="" aria-label="Fundacja HOOK - strona główna">
          <Image
            src="/logo.png"
            alt="Logo Fundacja HOOK"
            width={72}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        {/*Desktop navigation*/}
        <div className="hidden md:flex items-center gap-6 xl:gap-8 ">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring text-navbar cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile navigation */}
        <button
          className="md:hidden flex p-1 text-foreground focus:outline-none cursor-pointer"
          aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-1 border border-subtle bg-page shadow-sm p-4 flex flex-col md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm py-1 transition-colors focus-visible:outline-2 focus-visible:offset-2 focus-visible:outline-ring text-muted"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
