"use client";

import { ContactState, submitContactForm } from "@/lib/actions/contact";
import { useActionState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const initialState: ContactState = {};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  return (
    <form action={formAction} noValidate>
      <div>
        <label htmlFor="name">Imię</label>
        <Input id="name" name="name" required placeholder="Imię" />
        {state.errors?.name && (
          <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="surname">Nazwisko</label>
        <Input id="surname" name="surname" required placeholder="Nazwisko" />
        {state.errors?.surname && (
          <p className="text-red-500 text-xs mt-1">{state.errors.surname[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" name="email" required placeholder="Email" />
        {state.errors?.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="message">Wiadomość</label>
        <Input
          id="message"
          name="message"
          required
          placeholder="Twoja wiadomość"
        />
        {state.errors?.message && (
          <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Wysyłanie..." : "Wyślij"}
      </Button>
    </form>
  );
}
