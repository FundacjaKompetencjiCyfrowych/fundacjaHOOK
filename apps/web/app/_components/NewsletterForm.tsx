"use client";

import { useNewsletterSubmit } from "@/lib/hooks/useNewsletterSubmit";

interface NewsletterFormProps {
  SOCIAL_LINKS?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
}

export default function NewsletterForm({ SOCIAL_LINKS }: NewsletterFormProps) {
  const { email, setEmail, formAction, formRef, isPending, submitted } = useNewsletterSubmit();

  const platformLabels = {
    facebook: "f",
    instagram: "ig",
    linkedin: "in",
  };

  return (
    <div>
      <p className="mb-2 font-bold">Newsletter</p>
      <form ref={formRef} action={formAction} className="flex gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="[EMAIL INPUT]"
          disabled={isPending}
          className="flex-1 bg-elevated disabled:opacity-50 px-3 py-1.5 border border-subtle focus:border-brand-primary rounded outline-none min-w-0 text-main placeholder:text-muted text-sm"
        />
        <button
          type="submit"
          disabled={!email || isPending}
          className="bg-elevated hover:bg-brand-soft disabled:opacity-50 px-3 py-1.5 border border-subtle rounded text-main text-sm transition-colors disabled:cursor-not-allowed shrink-0"
        >
          {isPending ? "Wysyłanie..." : submitted ? "Zapisano!" : "Zapisz się"}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        {SOCIAL_LINKS &&
          Object.entries(SOCIAL_LINKS).map(
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
      </div>
    </div>
  );
}
