import type { HomeQueryResult } from "@/sanity/typegen";
import HomeHeroSection from "./HomeHeroSection";
import HomeAboutSection from "./HomeAboutSection";
import HomeSupportSection from "./HomeSupportSection";
import HomeContactSection from "./HomeContactSection";
import { HomeProjectsSection } from "./HomeProjectsSection";
import { HomeWorkshopsSection } from "./HomeWorkshopsSection";

export function HomeSections({ data }: { data: NonNullable<HomeQueryResult> }) {
  return (
    <>
      {data.hero?.title ? (
        <HomeHeroSection
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          image={data.hero.image}
        />
      ) : null}
      <HomeAboutSection
        title={data.aboutUs?.title}
        subtitle={data.aboutUs?.subtitle}
        backgroundImage={data.aboutUs?.backgroundImage}
        cards={data.aboutUs?.cards}
      />
      <HomeWorkshopsSection
        title={data.workshops?.title}
        subtitle={data.workshops?.subtitle}
        items={(data.workshops?.documents ?? []).filter((item) => item !== null)}
      />
      {data.supportUs?.title ? (
        <HomeSupportSection
          title={data.supportUs?.title}
          description={data.supportUs?.subtitle}
          backgroundImage={data.supportUs?.image}
          krsNumber={data.krs?.trim() || undefined}
          button={{ text: "Wesprzyj nas", href: "/support-us" }}
        />
      ) : null}
      <HomeProjectsSection
        title={data.projects?.title}
        subtitle={data.projects?.subtitle}
        items={(data.projects?.documents ?? []).filter((item) => item !== null)}
      />
      {data.contact?.title ? (
        <HomeContactSection
          title={data.contact?.title}
          description={data.contact?.subtitle}
          button={{ text: "Skontaktuj się z nami", href: "/contact" }}
        />
      ) : null}
    </>
  );
}
