"use client";

import SocialMediaLinks from "@/app/_components/SocialMediaLinks";
import { NewsletterSignupForm } from "./NewsletterSignupForm";

interface NewsletterFormProps {
  SOCIAL_LINKS?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
}

export default function NewsletterForm({ SOCIAL_LINKS }: NewsletterFormProps) {
  return (
    <div>
      <p className="mb-2 font-bold">Newsletter</p>
      <NewsletterSignupForm variant="footer" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
        <p className="font-bold">Obserwuj nas:</p>
        <div className="flex items-center gap-2">
          <SocialMediaLinks SocialLinks={SOCIAL_LINKS} />
        </div>
      </div>
    </div>
  );
}
