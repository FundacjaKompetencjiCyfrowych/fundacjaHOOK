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
    };
  }

  console.log("Contact subbmission received:", validated.data);

  return {
    success: true,
    message: "Dziękujemy! Wiadomość została wysłana",
  };
}
