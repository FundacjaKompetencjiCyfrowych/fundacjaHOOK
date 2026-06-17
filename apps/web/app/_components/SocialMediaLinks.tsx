interface SocialMediaLinksProps {
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
                className="flex justify-center items-center bg-elevated hover:bg-brand-soft rounded w-8 h-8 font-semibold text-main text-xs transition-colors"
              >
                {platformLabels[platform as keyof typeof platformLabels]}
              </a>
            )
        )}
    </>
  );
}
