import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { Toaster } from "sonner";
import { SanityPreview } from "@/sanity/preview/SanityPreview";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { q } from "@/sanity/groqd";

import UtilityHeader from "@/app/_components/Navigation/UtilityHeader";
import Navbar from "@/app/_components/Navigation/Navbar";
import NewsletterButton from "@/app/_components/Buttons/NewsletterButton";
import UpArrowButton from "@/app/_components/Buttons/UpArrowButton";
import Footer from "@/app/_components/Footer";
import { cn } from "@/lib/utils";

/** This is the base metadata for the entire project, it will cascade down to subpages
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function */

export async function generateMetadata(): Promise<Metadata> {
  const seo = q.star
    .filterByType("settings")
    .slice(0)
    .project((sub) => ({ seo: sub.field("seo") }));
  const { data } = await sanityFetch({
    query: seo.query,
    params: { page: "settings" },
    stega: false, // always set `stega: false` in Next's `generate` functions
  });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_ORIGIN),
    ...mapMetadata(seo.parse(data)),
  };
}

/** Setup font optimization
 * @see https://nextjs.org/docs/app/getting-started/fonts */

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={cn("h-full", "antialiased", "font-sans", poppins.variable)}>
      <body>
        <UtilityHeader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster />
        <SanityPreview />
        <NewsletterButton />
        <UpArrowButton />
        <Footer Address="ul. Przykładowa 123, 00-000 Miasto" />
      </body>
      <SanityLive />
    </html>
  );
}
