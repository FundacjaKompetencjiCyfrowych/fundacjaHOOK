import type { Metadata } from "next";

import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { cn } from "@/lib/utils";
import { MATERIAL_PLACEMENTS } from "@/lib/constants/materialPlacements";
import { mapMaterialsToFilterItems } from "@/lib/mappers/materials";
import MaterialySection from "@/app/_components/Sections/MaterialyPage/MaterialySection";
import { sanityFetch } from "@/sanity/live";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { aboutUsQuery } from "@/sanity/queries/aboutUs";
import { materialsQuery } from "@/sanity/queries/materials";
import { getMaterialsByPlacement } from "@/sanity/queries/materialsByPlacement";
import { SanityImage } from "@/sanity/image/SanityImage";

import MeaningCard from "./_components/MeaningCard";
import TeamMemberCard from "./_components/TeamMemberCard";
import Gallery from "./_components/Gallery";
import { mapContent } from "./mapContent";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: aboutUsQuery });
  return mapMetadata(data);
}

export default async function AboutUsPage() {
  const [{ data: aboutUsData }, { data: materialsData }] = await Promise.all([
    sanityFetch({ query: aboutUsQuery }),
    sanityFetch({ query: materialsQuery }),
  ]);
  const page = mapContent(aboutUsData);
  const mediaMaterials = mapMaterialsToFilterItems(
    getMaterialsByPlacement(materialsData, MATERIAL_PLACEMENTS.ABOUT_US_MEDIA)
  );
  const foundationMaterials = mapMaterialsToFilterItems(
    getMaterialsByPlacement(materialsData, MATERIAL_PLACEMENTS.ABOUT_US_DOCS)
  );

  return (
    <>
      <Breadcrumbs segments={[{ label: "O nas" }]} />

      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <PageTitle>O nas</PageTitle>

          {(page.mission?.description || page.mission?.image) && (
            <section className="mt-6 pb-10">
              <h2 className="font-medium text-base text-main leading-[1.1]">Misja i wizja</h2>
              <div
                className={cn(
                  "gap-6 grid mt-3",
                  page.mission?.description && page.mission?.image && "md:grid-cols-[2fr_1fr]"
                )}
              >
                {page.mission?.description && (
                  <p className="text-muted text-sm leading-5">{page.mission.description}</p>
                )}
                {page.mission?.image && (
                  <SanityImage
                    image={page.mission.image}
                    width={420}
                    height={230}
                    className="rounded-xl w-full object-contain"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "420px",
                      maxHeight: "230px",
                    }}
                  />
                )}
              </div>
            </section>
          )}

          {page.meaningCards.length > 0 && (
            <section className="mt-12">
              <h2 className="font-bold text-main text-lg leading-7">
                Nazwa, która znaczy więcej niż słowo
              </h2>
              <div className="gap-10 md:gap-8 grid md:grid-cols-4 mt-10">
                {page.meaningCards.map((card) => (
                  <MeaningCard key={card._key} card={card} />
                ))}
              </div>
            </section>
          )}

          {page.galleryImages.length > 0 && (
            <section className="mt-12">
              <h2 className="font-bold text-main text-lg leading-7">Galeria</h2>
              <Gallery images={page.galleryImages} />
            </section>
          )}

          {page.teamMembers.length > 0 && (
            <section className="mt-12">
              <h2 className="font-bold text-main text-lg leading-7">Zespół</h2>
              <div className="gap-4 grid md:grid-cols-2 mt-3">
                {page.teamMembers.map((member) => (
                  <TeamMemberCard key={member._key} member={member} />
                ))}
              </div>
            </section>
          )}

          <section className="mt-12">
            <h2 className="font-bold text-main text-lg leading-7">Dla mediów i partnerów</h2>
            <div className="mt-3">
              <MaterialySection materials={mediaMaterials} />
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-bold text-main text-lg leading-7">Dokumenty fundacji</h2>
            <div className="mt-3">
              <MaterialySection materials={foundationMaterials} />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
