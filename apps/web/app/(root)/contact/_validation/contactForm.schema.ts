import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Imię musi mieć co najmniej 2 znaki"),
  surname: z.string().trim().min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  email: z.string().trim().email("Nieprawidłowy adres email"),
  message: z.string().trim().min(1, "Wiadomość jest wymagana"),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;
