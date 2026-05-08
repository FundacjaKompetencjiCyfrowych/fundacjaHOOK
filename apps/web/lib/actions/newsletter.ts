"use server";

/**
 * Server action for handling newsletter email submission
 * Currently simulates submission with a 2-second delay
 *
 * #TODO: Integrate with actual email service or API route
 */
export async function submitNewsletterEmail(prevState: { submitted: boolean }, formData: FormData) {
  const email = formData.get("email") as string;

  // Validate email
  if (!email || !email.includes("@")) {
    return { submitted: false, error: "Invalid email" };
  }

  // Simulate submission delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return success state
  return { submitted: true, error: null };
}
