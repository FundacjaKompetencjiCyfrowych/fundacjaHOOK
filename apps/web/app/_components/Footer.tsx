import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import ROUTES from "@/constants/routes";

interface FooterProps {
  address: string;
  logo?: string | null;
  socialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
}

export default async function Footer({ address, logo, socialLinks }: FooterProps) {
  const mainLinks = [
    ["Warsztaty", ROUTES.WORKSHOPS],
    ["Materiały", ROUTES.MATERIALS],
    ["Wesprzyj nas", ROUTES.SUPPORT_US],
    ["O nas", ROUTES.ABOUT_US],
    ["Kontakt", ROUTES.CONTACT],
  ];

  const legalLinks = [
    ["Klauzula informacyjna", ROUTES.INFORMATION_CLAUSE],
    ["Polityka prywatności (RODO)", ROUTES.PRIVACY_POLICY],
  ];

  const logoUrl = logo;
  const socialLinksData = socialLinks;

  return (
    <footer className="bg-sunken px-4 py-10 border-subtle border-t text-main">
      <div className="mx-auto container">
        {/*Left part*/}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4 text-sm">
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
            <p className="mt-2">{address}</p>
          </div>
          {/*Main links*/}
          <div>
            <p className="mb-2 font-bold">Linki</p>
            <ul className="space-y-1 text-muted">
              {mainLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/*Legal links*/}
          <div>
            <p className="mb-2 font-bold">Prawne</p>
            <ul className="space-y-1 text-muted">
              {legalLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/*Newsletter*/}
          <div>
            <NewsletterForm SOCIAL_LINKS={socialLinksData} />
          </div>
        </div>
      </div>
    </footer>
  );
}
