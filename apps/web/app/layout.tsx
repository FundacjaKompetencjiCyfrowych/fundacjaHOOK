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
import { settingsQuery } from "@/sanity/queries/settings";
import { organizationDetailsQuery } from "@/sanity/queries/organizationDetails";
import type { OrganizationDetailsQueryResult, SettingsQueryResult } from "@/sanity/typegen";

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
  const [{ data: settingsData }, { data: organizationDetailsData }] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({ query: organizationDetailsQuery }),
  ]);

  const settings: SettingsQueryResult = settingsData ?? null;
  const organizationDetails: OrganizationDetailsQueryResult = organizationDetailsData ?? null;

  const logoTop = settings?.logoTop?.logo?.asset?.url;
  const logoBottom = settings?.logoBottom?.logo?.asset?.url;
  const address = organizationDetails?.address;
  const krs = organizationDetails?.krs;

  return (
    <html lang="pl" className={cn("h-full", "antialiased", "font-sans", poppins.variable)}>
      <body className="flex flex-col min-h-full">
        <UtilityHeader SocialLinks={settings?.link?.socialLinks} krs={krs} />
        <Navbar Logo={logoTop} />
        <main className="flex-1">{children}</main>
        <Toaster />
        <SanityPreview />
        <NewsletterButton />
        <UpArrowButton />
        <Footer
          address={address}
          krs={krs}
          logo={logoBottom}
          socialLinks={settings?.link?.socialLinks}
        />
      </body>
      <SanityLive />
    </html>
  );
}
