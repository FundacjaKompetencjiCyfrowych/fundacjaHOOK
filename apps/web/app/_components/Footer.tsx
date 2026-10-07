import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import FooterYear from "./FooterYear";
import ROUTES from "@/constants/routes";
import { Suspense } from "react";
import { sanityFetch } from "@/sanity/live";
import { legalPagesQuery } from "@/sanity/queries/legalPages";

interface FooterProps {
  address?: string | null;
  krs?: string | null;
  logo?: string | null;
  socialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
}

export default async function Footer({ address, krs, logo, socialLinks }: FooterProps) {
  const { data: legalPages } = await sanityFetch({ query: legalPagesQuery });

  const mainLinks = [
    ["Warsztaty", ROUTES.WORKSHOPS],
    ["Materiały", ROUTES.MATERIALS],
    ["Wesprzyj nas", ROUTES.SUPPORT_US],
    ["O nas", ROUTES.ABOUT_US],
    ["Kontakt", ROUTES.CONTACT],
  ];

  const logoUrl = logo;
  const socialLinksData = socialLinks;

  return (
    <footer className="border-subtle border-t text-main">
      <div className="bg-sunken px-4 py-10 md:py-11">
        <div className="mx-auto container">
          <div className="gap-x-8 gap-y-10 grid grid-cols-1 text-sm md:grid-cols-4">
            <div>
              {/*Logo*/}
              <div className="relative w-32 h-12">
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt="Fundacja HOOK"
                    fill
                    priority
                    className="object-contain object-left"
                  />
                )}
              </div>
              {address && <p className="mt-2">{address}</p>}
              {krs && <p className="mt-1 text-muted">KRS: {krs}</p>}
            </div>
            <div>
              <p className="mb-2 font-bold">Linki</p>
              <ul className="space-y-1 text-muted">
                {mainLinks.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-bold">Prawne</p>
              <ul className="space-y-1 text-muted">
                {legalPages?.map((page) => (
                  <li key={page._id}>
                    <Link href={`/${page.slug}`} className="hover:underline">
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <NewsletterForm SOCIAL_LINKS={socialLinksData} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-subtle border-t px-4 pt-1.25 pb-1 text-center text-main text-[10px] leading-[15px]">
        ©{" "}
        <Suspense>
          <FooterYear />
        </Suspense>{" "}
        Strona wykonana przez{" "}
        <a
          href="https://www.cyfrowe.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold hover:underline"
        >
          Fundację Kompetencji Cyfrowych
        </a>
      </div>
    </footer>
  );
}
