"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitNewsletterEmail } from "@/lib/actions/newsletter";

/**
 * Custom hook for managing newsletter email submission
 * Uses React's useActionState for automatic pending state management
 * Resets submitted feedback after 2 seconds
 */
export function useNewsletterSubmit() {
  const [email, setEmail] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitNewsletterEmail, {
    submitted: false,
    error: null,
  });

  // Reset email and form after successful submission
  useEffect(() => {
    if (!state.submitted) return;
    const timeout = setTimeout(() => {
      setEmail("");
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [state.submitted]);

  return {
    email,
    setEmail,
    formAction,
    formRef,
    isPending,
    submitted: state.submitted,
    error: state.error,
  };
}
