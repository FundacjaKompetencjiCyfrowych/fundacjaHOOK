"use client";

//TODO: create validation for email input and show error message if email is invalid

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewsletterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const timeout = setTimeout(() => {
      setSubmitted(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [submitted]);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSignIn = () => {
    setIsOpen(false);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/*Main view*/}
      {!isOpen && !submitted && (
        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-lg border border-transparent bg-brand-soft px-4 py-2 font-sans text-main transition-all duration-200 hover:border-brand-primary/10 hover:bg-brand-primary/10 shadow-lg"
          onClick={handleClick}
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
        </button>
      )}

      {/*Sign in view*/}
      {isOpen && (
        <div className="bg-page border border-subtle p-4 w-72 rounded-xl animate-in slide-in-from-left-2 duration-200">
          <div className="flex flex-col justify-between items-center mb-3">
            <div className="flex justify-between w-full mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Newsletter
              </span>
              <button
                type="button"
                className="text-muted hover:text-main transition-colors duration-200"
                onClick={() => setIsOpen(false)}
                aria-label="Zamknij"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm mb-3 text-main">Zapisz się do naszego newslettera</p>
            <input
              type="email"
              className="w-full border border-soft px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-1 focus:ring-ring rounded-lg"
              placeholder="Twój adres email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 text-sm w-full mt-2 transition-colors rounded-lg bg-brand-soft text-main"
              onClick={handleSignIn}
            >
              Zapisz się
            </button>
          </div>
        </div>
      )}

      {/*Submitted view*/}
      {submitted && (
        <div className="w-72 rounded-2xl border border-soft bg-page px-4 py-3 shadow-lg animate-in slide-in-from-left-2 duration-200">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Newsletter
            </span>
            <button
              type="button"
              className="text-muted hover:text-main transition-colors duration-200"
              onClick={() => setSubmitted(false)}
              aria-label="Zamknij"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm leading-none text-main">Dziękujemy za zapisanie się!</p>
        </div>
      )}
    </div>
  );
}
