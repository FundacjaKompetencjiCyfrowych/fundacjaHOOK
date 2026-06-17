import { SOCIAL_LINKS } from "@/lib/constants";

//TODO: make krs fetched from sanity and add real links to social media (also fetched from sanity i think?)
interface UtilityHeaderProps {
  SocialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
}

const platformLabels = {
  facebook: "f",
  instagram: "ig",
  linkedin: "in",
};

export default function UtilityHeader({ SocialLinks }: UtilityHeaderProps) {
  return (
    <header className="bg-sunken px-6 py-2 border-subtle border-b w-full">
      <div className="flex justify-between items-center mx-auto text-xs sm:text-sm">
        <div className="text-main">
          KRS: <span className="font-mono">[0000000000]</span>
        </div>

        <div className="flex items-center gap-2">
          {SocialLinks &&
            Object.entries(SocialLinks).map(
              ([platform, link]) =>
                link && (
                  <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center bg-elevated hover:bg-brand-soft rounded w-8 h-8 font-semibold text-main text-xs transition-colors"
                  >
                    {platformLabels[platform as keyof typeof platformLabels]}
                  </a>
                )
            )}

          <button className="bg-elevated hover:bg-brand-primary ml-2 px-4 py-1.5 rounded-md font-medium text-main hover:text-white transition-all cursor-pointer">
            Wesprzyj nas
          </button>
        </div>
      </div>
    </header>
  );
}
