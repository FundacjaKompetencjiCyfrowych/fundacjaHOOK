import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import ROUTES from "@/constants/routes";
import { settingsQuery } from "@/sanity/queries/settings";
import { sanityFetch } from "@/sanity/live";

export default async function Footer({ Address }: { Address: string }) {
  const settings = await sanityFetch({
    query: settingsQuery,
  });

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

  const logoUrl = settings?.data?.logo?.logo?.asset?.url;
  const socialLinks = settings?.data?.link?.socialLinks;

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
            <p className="mt-2">{Address}</p>
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
            <NewsletterForm SOCIAL_LINKS={socialLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
}
