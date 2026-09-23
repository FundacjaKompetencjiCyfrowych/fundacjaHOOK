"use client";

import { useNewsletterSubmit } from "@/lib/hooks/useNewsletterSubmit";
import SocialMediaLinks from "@/app/_components/SocialMediaLinks";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

interface NewsletterFormProps {
  SOCIAL_LINKS?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
}

export default function NewsletterForm({ SOCIAL_LINKS }: NewsletterFormProps) {
  const { email, setEmail, formAction, formRef, isPending, submitted } = useNewsletterSubmit();

  return (
    <div>
      <p className="mb-2 font-bold">Newsletter</p>
      <form ref={formRef} action={formAction} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mail@hook.pl"
          disabled={isPending}
          className="bg-white px-4 border-gray-500 focus-visible:border-brand-primary h-10 placeholder:text-gray-500"
        />
        <Button
          type="submit"
          variant="secondary"
          size="default"
          disabled={!email || isPending}
          className="h-10 shrink-0"
        >
          {isPending ? "Wysyłanie..." : submitted ? "Zapisano!" : "Zapisz się"}
        </Button>
      </form>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
        <p className="font-bold">Obserwuj nas:</p>
        <div className="flex items-center gap-2">
          <SocialMediaLinks SocialLinks={SOCIAL_LINKS} />
        </div>
      </div>
    </div>
  );
}
