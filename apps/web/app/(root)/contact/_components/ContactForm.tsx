"use client";

import { useActionState, useEffect, useState } from "react";
import { submitContactForm, type ContactState } from "../_actions/submitContactForm";
import { contactFormSchema, type ContactFormValues } from "../_validation/contactForm.schema";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";

const initialState: ContactState = {};

const initialValues: ContactFormValues = {
  name: "",
  surname: "",
  email: "",
  message: "",
};

type ContactField = keyof ContactFormValues;

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [touchedFields, setTouchedFields] = useState<Partial<Record<ContactField, boolean>>>({});
  const validation = contactFormSchema.safeParse(values);
  const clientErrors = validation.success ? {} : validation.error.flatten().fieldErrors;

  useEffect(() => {
    if (state.success) {
      setValues(initialValues);
      setTouchedFields({});
    }
  }, [state.success]);

  const handleFirstInteraction = () => {
    if (!startedAt) {
      setStartedAt(Date.now());
    }
  };

  const handleChange = (field: ContactField, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const handleBlur = (field: ContactField) => {
    setTouchedFields((currentFields) => ({ ...currentFields, [field]: true }));
  };

  const getError = (field: ContactField) => {
    if (touchedFields[field]) return clientErrors[field]?.[0];
    return state.errors?.[field]?.[0];
  };

  return (
    <form
      action={formAction}
      noValidate
      onFocusCapture={handleFirstInteraction}
      className="space-y-5"
    >
      {state.message && (
        <div
          className={cn(
            "p-3 rounded-xl text-sm font-medium border",
            state.success
              ? "bg-green-800 border-green-200 text-white"
              : "bg-destructive/10 text-destructive border-destructive/20"
          )}
        >
          {state.message}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-foreground">
          Imię{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only"> (wymagane)</span>
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Imię"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          onBlur={() => handleBlur("name")}
          required
          aria-invalid={Boolean(getError("name"))}
          aria-describedby={getError("name") ? "name-error" : undefined}
          disabled={isPending}
          className="rounded-xl border-subtle focus-visible:ring-brand-primary h-10"
        />
        {getError("name") && (
          <p id="name-error" className="text-destructive text-xs font-medium mt-1">
            {getError("name")}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="surname" className="text-foreground">
          Nazwisko{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only"> (wymagane)</span>
        </Label>
        <Input
          id="surname"
          name="surname"
          placeholder="Nazwisko"
          value={values.surname}
          onChange={(event) => handleChange("surname", event.target.value)}
          onBlur={() => handleBlur("surname")}
          required
          aria-invalid={Boolean(getError("surname"))}
          aria-describedby={getError("surname") ? "surname-error" : undefined}
          disabled={isPending}
          className="rounded-xl border-subtle focus-visible:ring-brand-primary h-10"
        />
        {getError("surname") && (
          <p id="surname-error" className="text-destructive text-xs font-medium mt-1">
            {getError("surname")}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-foreground">
          Email{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only"> (wymagane)</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          onBlur={() => handleBlur("email")}
          required
          aria-invalid={Boolean(getError("email"))}
          aria-describedby={getError("email") ? "email-error" : undefined}
          disabled={isPending}
          className="rounded-xl border-subtle focus-visible:ring-brand-primary h-10"
        />
        {getError("email") && (
          <p id="email-error" className="text-destructive text-xs font-medium mt-1">
            {getError("email")}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-foreground">
          Wiadomość{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only"> (wymagane)</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Twoja wiadomość"
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          required
          aria-invalid={Boolean(getError("message"))}
          aria-describedby={getError("message") ? "message-error" : undefined}
          rows={5}
          disabled={isPending}
          className="rounded-xl border-subtle focus-visible:ring-brand-primary resize-y min-h-[120px]"
        />
        {getError("message") && (
          <p id="message-error" className="text-destructive text-xs font-medium mt-1">
            {getError("message")}
          </p>
        )}
      </div>

      <input name="website" tabIndex={-1} className="hidden" />
      <input type="hidden" name="startedAt" value={startedAt ?? ""} />

      <Button
        type="submit"
        disabled={!validation.success || isPending}
        className="bg-brand-primary hover:bg-brand-onhover text-white rounded-xl h-10 px-5 transition-colors font-medium cursor-pointer"
      >
        {isPending ? "Wysyłanie..." : "Wyślij"}
      </Button>
    </form>
  );
}
