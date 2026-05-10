import type { Img, LeadSection, PostsSection } from "@/sanity/typegen";
import Link from "next/link";
import { SanityImage } from "@/sanity/image/SanityImage";
import { ComponentType } from "react";
import { q } from "../groqd";
import { sanityFetch } from "../live";
import Hero from "@/app/_components/Sections/LandingPage/Hero";
import CardsLandingSection from "@/app/_components/Sections/LandingPage/CardsLandingSection";
import CardsWithRedirectSection from "@/app/_components/Sections/LandingPage/CardsWithRedirectSection";
import SupportSection from "@/app/_components/Sections/LandingPage/SupportSection";
import CooperationSection from "@/app/_components/Sections/LandingPage/CooperationSection";

/**
 * Example: A `section` registry mapping Sanity `_type` values to React components.
 *
 * Notes:
 * - TypeScript support -> you can infer query return types from GROQD or use typegen output
 * - Components can be inlined (as shown) or imported from separate files for better organization
 * - Remember that async components are server components (won't work on the client)
 * - Missing or null fields should be handled within each component
 */
export const components: { [key: string]: ComponentType<any> } = {
  heroSection: HeroSectionComponent,
  sectionHero: HeroSectionComponent,
  leadSection: LeadSectionComponent,
  sectionLead: LeadSectionComponent,
  postsSection: PostsSectionComponent,
  sectionPost: PostsSectionComponent,
  img: ImageSectionComponent,
  sectionImage: ImageSectionComponent,
  cardswithbackground: CardsWithBackgroundSectionComponent,
  sectionCardsWithBackground: CardsWithBackgroundSectionComponent,
  cardsLandingSection: CardsWithBackgroundSectionComponent,
  sectionCardsLanding: CardsWithBackgroundSectionComponent,
  cardswithredirect: CardsWithRedirectSectionComponent,
  sectionCardsWithRedirect: CardsWithRedirectSectionComponent,
  supportSection: SupportSectionComponent,
  sectionSupport: SupportSectionComponent,
  cooperationSection: CooperationSectionComponent,
  sectionCooperation: CooperationSectionComponent,
};

function HeroSectionComponent({
  item,
}: {
  item: { title: string; subtitle: string; image: { [key: string]: any } };
}) {
  return <Hero title={item.title} subtitle={item.subtitle} image={item.image} />;
}

function LeadSectionComponent({ item }: { item: LeadSection }) {
  return (
    <>
      <h1 className="max-w-xs heading-1">{item.title}</h1>
      <p className="max-w-md body-base">{item.subtitle}</p>
    </>
  );
}

async function PostsSectionComponent({ item }: { item: PostsSection }) {
  const latestPosts = q.star
    .filterByType("post")
    .slice(0, item.displayNumber ?? 3)
    .order("publishedAt desc")
    .project((sub) => ({
      _id: sub.field("_id"),
      title: sub.field("title"),
      image: sub.field("image"),
      slug: sub.field("slug"),
    }));
  const { data } = await sanityFetch({ query: latestPosts.query });
  const posts = latestPosts.parse(data);
  if (!posts) return <h2>No posts found.</h2>;

  return (
    <>
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug?.current}`}>
          <h2>{post.title}</h2>
          <SanityImage image={post.image} height={300} width={300} />
        </Link>
      ))}
    </>
  );
}

function ImageSectionComponent({ item }: { item: Img }) {
  return <SanityImage image={item} height={300} width={300} />;
}

function CardsWithBackgroundSectionComponent({
  item,
}: {
  item: {
    title?: string;
    subtitle?: string;
    backgroundImage?: Img;
    cards?: Array<{ _id: string; title?: string; description?: string; image?: Img }>;
  };
}) {
  return (
    <CardsLandingSection
      title={item.title}
      subtitle={item.subtitle}
      backgroundImage={item.backgroundImage}
      cards={item.cards}
    />
  );
}

function CardsWithRedirectSectionComponent({
  item,
}: {
  item: {
    title?: string;
    subtitle?: string;
    cards?: Array<{
      _id: string;
      title?: string;
      description?: string;
      image?: Img;
      href?: string;
      hrefText?: string;
    }>;
    button?: {
      _id: string;
      text?: string;
      href?: string;
    };
  };
}) {
  return (
    <CardsWithRedirectSection
      title={item.title}
      subtitle={item.subtitle}
      cards={item.cards}
      button={item.button}
    />
  );
}

function SupportSectionComponent({
  item,
}: {
  item: {
    title?: string;
    description?: string;
    krsNumber?: string;
    backgroundImage?: Img;
    button?: {
      _id: string;
      text?: string;
      href?: string;
    };
  };
}) {
  return (
    <SupportSection
      title={item.title}
      description={item.description}
      krsNumber={item.krsNumber}
      backgroundImage={item.backgroundImage}
      button={item.button}
    />
  );
}

function CooperationSectionComponent({
  item,
}: {
  item: {
    title?: string;
    description?: string;
    button?: {
      _id: string;
      text?: string;
      href?: string;
    };
  };
}) {
  return (
    <CooperationSection title={item.title} description={item.description} button={item.button} />
  );
}
