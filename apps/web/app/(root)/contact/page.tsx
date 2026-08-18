import ContactForm from "@/app/_components/ContactForm";
import { sanityFetch } from "@/sanity/live";
import { contactPageQuery } from "@/sanity/queries/contactPage";

export default async function ContactPage() {
  const pageData = await sanityFetch({
    query: contactPageQuery,
  });
  return (
    <main>
      <h1>Kontakt</h1>
      <ContactForm />
    </main>
  );
}
