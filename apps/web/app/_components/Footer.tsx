import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

export default function Footer({ Address }: { Address: string }) {
  const mainLinks = [
    ["Warsztaty", "/warsztaty"],
    ["Materiały", "/materials"],
    ["Wesprzyj nas", "/wesprzyj-nas"],
    ["O nas", "/o-nas"],
    ["Kontakt", "/kontakt"],
  ];

  const legalLinks = [
    ["Klauzula informacyjna", "#"],
    ["Polityka prywatności (RODO)", "#"],
  ];

  return (
    <footer className="bg-sunken px-4 py-10 border-subtle border-t text-main">
      <div className="mx-auto container">
        {/*Left part*/}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4 text-sm">
          <div>
            <Image src="/logo.png" alt="Fundacja HOOK" width={40} height={90} />
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
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
