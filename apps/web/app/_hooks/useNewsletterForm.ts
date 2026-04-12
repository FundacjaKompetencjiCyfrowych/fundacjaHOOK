import { useRef, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

interface SubscribeRequestBody {
  name: string;
  email: string;
}

interface UseNewsletterFormReturn {
  name: string;
  email: string;
  status: FormStatus;
  message: string;
  isLoading: boolean;
  isDisabled: boolean;
  formRef: React.RefObject<HTMLFormElement | null>;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

// Validation functions
const validateName = (name: string): string | null => {
  if (!name.trim()) return "Wymagane jest imię";
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "Wymagany jest email";
  if (!email.includes("@") || !email.includes(".")) {
    return "Wpisz poprawny adres email";
  }
  return null;
};

// API function
const submitSubscription = async (
  name: string,
  email: string
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email } as SubscribeRequestBody),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Coś poszło nie tak");
  }

  return { success: true, message: data.message || "Dziękujemy za zapisanie!" };
};

export const useNewsletterForm = (): UseNewsletterFormReturn => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const isLoading = status === "loading";
  const isDisabled = isLoading || !name.trim() || !email.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const nameError = validateName(name);
    const emailError = validateEmail(email);

    if (nameError || emailError) {
      setStatus("error");
      setMessage(nameError || emailError || "");
      return;
    }

    // Submit
    setStatus("loading");
    setMessage("");

    try {
      const result = await submitSubscription(name, email);
      setStatus("success");
      setMessage(result.message);
      setName("");
      setEmail("");
      formRef.current?.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Coś poszło nie tak. Spróbuj ponownie.");
    } finally {
      setStatus("idle");
    }
  };

  return {
    name,
    email,
    status,
    message,
    isLoading,
    isDisabled,
    formRef,
    setName,
    setEmail,
    handleSubmit,
  };
};
