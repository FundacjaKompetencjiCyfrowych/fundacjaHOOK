"use client";

import { useEffect, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timeout = setTimeout(() => setSubmitted(false), 2000);
    return () => clearTimeout(timeout);
  }, [submitted]);

  const handleSignIn = () => {
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="[EMAIL INPUT]"
          className="flex-1 min-w-0 rounded border border-subtle bg-elevated px-3 py-1.5 text-sm text-main placeholder:text-muted outline-none focus:border-brand-primary"
        />
        <button
          type="button"
          onClick={handleSignIn}
          disabled={!email}
          className="shrink-0 rounded border border-subtle bg-elevated px-3 py-1.5 text-sm text-main hover:bg-brand-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitted ? "Zapisano!" : "Zapisz się"}
        </button>
      </div>
      <div className="flex gap-2 mt-3 text-secondary-foreground">
        {[
          ["f", "#"],
          ["in", "#"],
          ["ig", "#"],
        ].map(([icon, link]) => (
          <a
            key={icon}
            href={link}
            className="w-8 h-8 flex items-center justify-center bg-elevated rounded hover:bg-brand-soft transition-colors"
          >
            <span className="text-main lowercase text-sm">{icon}</span>
          </a>
        ))}
      </div>
    </>
  );
}
