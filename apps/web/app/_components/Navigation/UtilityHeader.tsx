import SocialMediaLinks from "@/app/_components/SocialMediaLinks";

interface UtilityHeaderProps {
  SocialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
  krs?: string | null;
}

export default function UtilityHeader({ SocialLinks, krs }: UtilityHeaderProps) {
  return (
    <header className="bg-sunken px-4 py-2 border-subtle border-b w-full">
      <div className="flex justify-between items-center mx-auto text-xs sm:text-sm">
        <div className="text-main">
          KRS: <span className="font-mono">{krs ?? "[0000000000]"}</span>
        </div>

        <div className="flex items-center gap-1">
          <SocialMediaLinks SocialLinks={SocialLinks} />

          <button className="sm:ml-2 px-2 sm:px-4 py-1.5 rounded-md font-medium text-main hover:text-white transition-all cursor-pointer">
            Wesprzyj nas
          </button>
        </div>
      </div>
    </header>
  );
}
