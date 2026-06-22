import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { SanityImage } from "@/sanity/image/SanityImage";
import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";

// GROQD Query builders
const postSlugs = q.star
  .filterByType("post")
  .project((sub) => ({ slug: sub.field("slug.current") }));

const post = q
  .parameters<{ slug: string }>()
  .star.filterByType("post")
  .filterBy("slug.current == $slug")
  .slice(0);

/** Next doesn't know what slugs exist -> we can inform it so it can pre-generate all posts
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params */
export async function generateStaticParams() {
  const data = await client.fetch(postSlugs.query, {}, { perspective: "published", stega: false });

  if (!data || data.length === 0) {
    return [{ slug: "not-found" }];
  }
  return postSlugs.parse(data); // [{ slug: example-slug }, ...]
}

/** This allows us to overwrite specific metadata fields from the parent (e.g. title, description)
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: post.query,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  return mapMetadata(post.parse(data));
}

/** This page renders posts dynamically based on the slug in the URL path */
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data } = await sanityFetch({ query: post.query, params: { slug } });
  if (!data) notFound();
  const p = post.parse(data)!;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <main className="flex flex-col justify-between items-center sm:items-start px-16 py-32 w-full max-w-3xl min-h-screen">
        <div className="flex flex-col items-center sm:items-start gap-6 sm:text-left text-center">
          <div className="flex flex-col gap-6 p-5 border border-dotted">
            <div key={p._id} className="relative flex flex-col gap-2">
              <SanityImage image={p.image} mode="cover" width={600} height={300} />
              <SanityRichText value={p.body} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
