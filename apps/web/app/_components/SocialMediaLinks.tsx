import Image from "next/image";

interface SocialMediaLinksProps {
  SocialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
}

const platformIcons: Record<string, string> = {
  facebook: "/icons/facebook.svg",
  instagram: "/icons/ig.svg",
  linkedin: "/icons/linkedin.svg",
};

export default function SocialMediaLinks({ SocialLinks }: SocialMediaLinksProps) {
  return (
    <>
      {SocialLinks &&
        Object.entries(SocialLinks).map(
          ([platform, link]) =>
            link && (
              <a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Otwórz ${platform}`}
                className="flex justify-center items-center rounded-lg size-6 transition-opacity hover:opacity-70"
              >
                {platformIcons[platform] ? (
                  <Image
                    src={platformIcons[platform]}
                    alt={platform}
                    width={22}
                    height={22}
                    className="size-5"
                  />
                ) : (
                  <span className="font-semibold text-main text-xs">
                    {platform[0].toUpperCase()}
                  </span>
                )}
              </a>
            )
        )}
    </>
  );
}
