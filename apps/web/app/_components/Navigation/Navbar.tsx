"use client";

//TODO: dodać prawdziwe logo

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ROUTES from "@/constants/routes";

import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Warsztaty", href: ROUTES.WORKSHOPS },
    { name: "Projekty", href: ROUTES.PROJECTS },
    { name: "Materiały", href: ROUTES.MATERIALS },
    { name: "Aktualności", href: ROUTES.NEWS },
    { name: "Wesprzyj nas", href: ROUTES.SUPPORT_US },
    { name: "O nas", href: ROUTES.ABOUT_US },
    { name: "Kontakt", href: ROUTES.CONTACT },
  ];

  return (
    <div className="top-0 z-40 sticky flex justify-center px-4 py-3">
      <nav className="relative flex items-center gap-6 bg-brand-soft shadow-md px-6 py-2 border-0 border-secondary rounded-full">
        <Link href={ROUTES.HOME} className="" aria-label="Fundacja HOOK - strona główna">
          <Image
            src="/logo.png"
            alt="Logo Fundacja HOOK"
            width={72}
            height={32}
            className="w-auto h-8"
          />
        </Link>
        {/*Desktop navigation*/}
        <div className="hidden md:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 text-navbar text-sm transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile navigation */}
        <button
          className="md:hidden flex p-1 focus:outline-none text-foreground cursor-pointer"
          aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden top-full right-4 left-4 z-50 absolute flex flex-col bg-page shadow-sm mt-1 p-4 border border-subtle">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-1 focus-visible:outline-2 focus-visible:outline-ring text-muted text-sm transition-colors focus-visible:offset-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
