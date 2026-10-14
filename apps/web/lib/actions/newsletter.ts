"use server";

import { newsletterEmailSchema, type NewsletterState } from "@/lib/newsletter";

export async function submitNewsletterEmail(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = newsletterEmailSchema.safeParse(formData.get("email"));

  if (!email.success) {
    return { status: "error" };
  }

  // TODO: Integrate with a newsletter provider. No data is stored or sent yet.
  return { status: "success" };
}
