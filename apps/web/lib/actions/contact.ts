"use server";

import { z } from "zod";
import { resend } from "@/lib/resend";

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
  const MIN_FILL_TIME = 2500;

  // Fake response so bot thinks it succeded
  const honeypot = formData.get("website");

  if (honeypot) return { success: true, message: "Wiadomość została wysłana" };

  // Fake response for forms filled too fast (likely bots)
  const startedAt = Number(formData.get("startedAt"));
  if (!startedAt || Date.now() - startedAt < MIN_FILL_TIME) {
    return { success: true, message: "Wiadomość została wysłana" };
  }

  const values = {
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const validated = contactSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Kontakt <onboarding@resend.dev>", // Replace with your verified domain in production (e.g. kontakt@fundacja.pl)
      to: ["szymongrysiewicz@gmail.com"], // Destination email address
      subject: `Nowa wiadomość od ${validated.data.name} ${validated.data.surname}`,
      replyTo: validated.data.email,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${validated.data.name} ${validated.data.surname}</p>
        <p><strong>Email nadawcy:</strong> ${validated.data.email}</p>
        <p><strong>Wiadomość:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 12px; border-left: 4px solid #0091a5;">
          ${validated.data.message.replace(/\n/g, "<br>")}
        </blockquote>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.",
        values,
      };
    }

    return {
      success: true,
      message: "Dziękujemy! Wiadomość została pomyślnie wysłana.",
    };
  } catch (err) {
    console.error("Unexpected email error:", err);
    return {
      success: false,
      message: "Nieoczekiwany błąd serwera.",
      values,
    };
  }
}
