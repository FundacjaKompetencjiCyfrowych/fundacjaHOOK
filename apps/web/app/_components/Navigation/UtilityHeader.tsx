import SocialMediaLinks from "@/app/_components/SocialMediaLinks";

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
          <SocialMediaLinks SocialLinks={SocialLinks} />

          <button className="bg-elevated hover:bg-brand-primary ml-2 px-4 py-1.5 rounded-md font-medium text-main hover:text-white transition-all cursor-pointer">
            Wesprzyj nas
          </button>
        </div>
      </div>
    </header>
  );
}
