"use client";

import { X } from "lucide-react";
import { useId, useState } from "react";
import { NewsletterSignupForm } from "./NewsletterSignupForm";
import { Button } from "@/app/_components/ui/button";

export default function NewsletterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen && (
        <Button
          type="button"
          variant="ghost"
          className="group gap-2 rounded-lg border border-transparent bg-brand-soft px-4 py-2 font-sans text-main hover:border-brand-primary/10 hover:bg-brand-primary/10 shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <span className="text-xl leading-none" aria-hidden="true">
            &#9993;
          </span>
          <span className="text-[17px] font-medium tracking-tight">Newsletter</span>
          <span
            className="text-brand-primary transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            &gt;
          </span>
        </Button>
      )}

      {isOpen && (
        <section
          id={id}
          aria-label="Newsletter"
          onKeyDown={(event) => {
            if (event.key === "Escape") setIsOpen(false);
          }}
          className="relative bg-page border border-subtle p-6 w-[353px] max-w-[calc(100vw-2rem)] rounded-xl shadow-lg animate-in slide-in-from-left-2 duration-200"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="absolute right-2 top-2 text-muted hover:text-main"
            onClick={() => setIsOpen(false)}
            aria-label="Zamknij newsletter"
          >
            <X size={16} />
          </Button>
          <NewsletterSignupForm variant="popup" />
        </section>
      )}
    </div>
  );
}
