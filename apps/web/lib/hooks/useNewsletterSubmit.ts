"use client";

import { useActionState, useState } from "react";
import { submitNewsletterEmail } from "@/lib/actions/newsletter";
import { newsletterEmailSchema, type NewsletterState } from "@/lib/newsletter";

export function useNewsletterSubmit() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterState["status"]>("idle");
  const [, formAction, isPending] = useActionState<NewsletterState, FormData>(
    async (prevState, formData) => {
      setStatus("idle");
      const parsedEmail = newsletterEmailSchema.safeParse(formData.get("email"));

      if (!parsedEmail.success) {
        setStatus("error");
        return { status: "error" };
      }

      formData.set("email", parsedEmail.data);

      try {
        const result = await submitNewsletterEmail(prevState, formData);
        setStatus(result.status);

        if (result.status === "success") {
          setEmail("");
        }

        return result;
      } catch {
        setStatus("error");
        return { status: "error" };
      }
    },
    { status: "idle" }
  );

  function updateEmail(value: string) {
    setEmail(value);
    setStatus("idle");
  }

  return {
    email,
    updateEmail,
    formAction,
    isPending,
    status,
    resetStatus: () => setStatus("idle"),
    canSubmit: newsletterEmailSchema.safeParse(email).success && !isPending,
  };
}
