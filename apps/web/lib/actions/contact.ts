"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
  surname: z.string().min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  email: z.string().email("Nieprawidłowy adres email"),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
});

export type ContactState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  values?: {
    name?: string;
    surname?: string;
    email?: string;
    message?: string;
  };
};

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const validated = contactSchema.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      values: {
        name: formData.get("name") as string,
        surname: formData.get("surname") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
      },
    };
  }

  return {
    success: true,
    message: "Dziękujemy! Wiadomość została wysłana",
  };
}
