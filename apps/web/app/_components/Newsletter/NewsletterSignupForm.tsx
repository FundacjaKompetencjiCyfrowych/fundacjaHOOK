"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { useId } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useNewsletterSubmit } from "@/lib/hooks/useNewsletterSubmit";
import { cn } from "@/lib/utils";

interface NewsletterSignupFormProps {
  variant: "footer" | "popup";
}

export function NewsletterSignupForm({ variant }: NewsletterSignupFormProps) {
  const { email, updateEmail, formAction, isPending, status, resetStatus, canSubmit } =
    useNewsletterSubmit();
  const id = useId();
  const isFooter = variant === "footer";
  const showPopupResult = !isFooter && status !== "idle";
  const isSuccess = status === "success";
  const message = isSuccess
    ? "Zapis do newslettera powiódł się"
    : status === "error"
      ? "Coś poszło nie tak!"
      : "";
  const ResultIcon = isSuccess ? CircleCheck : CircleX;

  return (
    <div>
      <div
        id={`${id}-feedback`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          showPopupResult ? "flex flex-col items-center gap-3 py-1 text-center" : "sr-only",
          isSuccess ? "text-[#0da536]" : "text-destructive"
        )}
      >
        {showPopupResult && <ResultIcon className="size-32" strokeWidth={1.5} aria-hidden="true" />}
        {message && (
          <div>
            <p className="text-base font-medium">{message}</p>
            {showPopupResult && isSuccess && <p className="text-sm">Sprawdź skrzynkę pocztową</p>}
          </div>
        )}
        {showPopupResult && status === "error" && (
          <p className="text-sm text-muted">Spróbuj ponownie za chwilę.</p>
        )}
      </div>

      {showPopupResult ? (
        status === "error" && (
          <Button type="button" variant="alternative" className="mt-4 w-full" onClick={resetStatus}>
            Spróbuj ponownie
          </Button>
        )
      ) : (
        <>
          {!isFooter && (
            <>
              <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
                Newsletter
              </h2>
              <p className="text-sm mb-3 text-black">Zapisz się do naszego newslettera</p>
            </>
          )}
          <form
            action={formAction}
            aria-busy={isPending}
            className={cn("grid", isFooter ? "gap-2 sm:grid-cols-[minmax(0,1fr)_auto]" : "gap-5")}
          >
            <label htmlFor={`${id}-email`} className="sr-only">
              Adres e-mail
            </label>
            <Input
              id={`${id}-email`}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => updateEmail(event.target.value)}
              placeholder={isFooter ? "mail@hook.pl" : "Twój adres email"}
              disabled={isPending}
              aria-describedby={message ? `${id}-feedback` : undefined}
              className={cn(
                "bg-white",
                isFooter
                  ? "h-10 border-gray-500 focus-visible:border-brand-primary placeholder:text-gray-500"
                  : "h-9 border-subtle hover:border-subtle text-black placeholder:text-muted"
              )}
            />
            <Button
              type="submit"
              variant={isFooter ? "secondary" : "alternative"}
              disabled={!canSubmit}
              className={isFooter ? "h-10" : "h-9 w-full"}
            >
              {isPending
                ? "Wysyłanie..."
                : isSuccess
                  ? "Zapisano!"
                  : status === "error"
                    ? "Coś poszło nie tak!"
                    : "Zapisz się"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
