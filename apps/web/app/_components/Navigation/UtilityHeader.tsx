import { SOCIAL_LINKS } from "@/lib/constants";

//TODO: make krs fetched from sanity and add real links to social media (also fetched from sanity i think?)

export default function UtilityHeader() {
  return (
    <header className="w-full border-b border-subtle bg-sunken py-2 px-6">
      <div className=" mx-auto flex items-center justify-between text-xs sm:text-sm">
        <div className="text-main">
          KRS: <span className="font-mono">[0000000000]</span>
        </div>

        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(([icon, link]) => (
            <a
              key={icon}
              href={link}
              className="w-8 h-8 flex items-center justify-center bg-elevated rounded hover:bg-brand-soft transition-colors"
            >
              <span className="text-main lowercase">{icon}</span>
            </a>
          ))}

          <button className="ml-2 px-4 py-1.5 bg-elevated text-main font-medium rounded-md cursor-pointer hover:bg-brand-primary hover:text-white transition-all">
            Wesprzyj nas
          </button>
        </div>
      </div>
    </header>
  );
}
