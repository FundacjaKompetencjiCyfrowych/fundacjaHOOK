import { z } from "zod";

export const newsletterEmailSchema = z.string().trim().pipe(z.email());

export type NewsletterState = {
  status: "idle" | "success" | "error";
};
