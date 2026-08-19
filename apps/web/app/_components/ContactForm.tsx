"use client";

import { useActionState } from "react";
import { ContactState, submitContactForm } from "@/lib/actions/contact";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const initialState: ContactState = {};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && (
        <div
          className={cn(
            "p-3 rounded-xl text-sm font-medium border",
            state.success
              ? "bg-green-800 border-green-200"
              : "bg-destructive/10 text-destructive border-destructive/20"
          )}
        >
          {state.message}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-foreground">
          Imię
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Imię"
          defaultValue={state.values?.name}
          disabled={isPending}
          className="rounded-xl border-subtle focus-visible:ring-brand-primary h-10"
        />
        {state.errors?.name && (
          <p className="text-destructive text-xs font-medium mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="surname" className="text-foreground">
          Nazwisko
        </Label>
        <Input
          id="surname"
          name="surname"
          placeholder="Nazwisko"
          defaultValue={state.values?.surname}
          disabled={isPending}
          className="rounded-xl border-subtle focus-visible:ring-brand-primary h-10"
        />
        {state.errors?.surname && (
          <p className="text-destructive text-xs font-medium mt-1">{state.errors.surname[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={state.values?.email}
          disabled={isPending}
          className="rounded-xl border-subtle focus-visible:ring-brand-primary h-10"
        />
        {state.errors?.email && (
          <p className="text-destructive text-xs font-medium mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-foreground">
          Wiadomość
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Twoja wiadomość"
          defaultValue={state.values?.message}
          rows={5}
          disabled={isPending}
          className="rounded-xl border-subtle focus-visible:ring-brand-primary resize-y min-h-[120px]"
        />
        {state.errors?.message && (
          <p className="text-destructive text-xs font-medium mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-brand-primary hover:bg-brand-onhover text-white rounded-xl h-10 px-5 transition-colors font-medium cursor-pointer"
      >
        {isPending ? "Wysyłanie..." : "Wyślij"}
      </Button>
    </form>
  );
}
