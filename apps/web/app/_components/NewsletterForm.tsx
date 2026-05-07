"use client";

import { SOCIAL_LINKS } from "@/lib/constants";
import { useNewsletterSubmit } from "@/lib/hooks/useNewsletterSubmit";

export default function NewsletterForm() {
  const { email, setEmail, formAction, formRef, isPending, submitted } = useNewsletterSubmit();

  return (
    <div>
      <p className="font-bold mb-2">Newsletter</p>
      <form ref={formRef} action={formAction} className="flex gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="[EMAIL INPUT]"
          disabled={isPending}
          className="flex-1 min-w-0 rounded border border-subtle bg-elevated px-3 py-1.5 text-sm text-main placeholder:text-muted outline-none focus:border-brand-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!email || isPending}
          className="shrink-0 rounded border border-subtle bg-elevated px-3 py-1.5 text-sm text-main hover:bg-brand-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Wysyłanie..." : submitted ? "Zapisano!" : "Zapisz się"}
        </button>
      </form>
      <div className="flex gap-2 mt-3 text-secondary-foreground">
        {SOCIAL_LINKS.map(([icon, link]) => (
          <a
            key={icon}
            href={link}
            className="w-8 h-8 flex items-center justify-center bg-elevated rounded hover:bg-brand-soft transition-colors"
          >
            <span className="text-main lowercase text-sm">{icon}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
