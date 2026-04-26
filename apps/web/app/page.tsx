import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { notFound } from "next/navigation";

export default async function Home() {
  const home = q.star.filterByType("home").slice(0);

  const { data } = await sanityFetch({ query: home.query });
  if (!data || data.length === 0) notFound();
  const h = data[0];

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <SanitySections value={h?.sections} />
        </div>
      </main>
    </div>
  );
}
