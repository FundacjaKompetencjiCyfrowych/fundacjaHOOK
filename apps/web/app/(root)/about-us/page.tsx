import type { Metadata } from "next";
import TeamMemberCard from "@/app/_components/Cards/TeamMemberCard";
import MaterialySection from "@/app/_components/Sections/MaterialyPage/MaterialySection";
import { MATERIAL_PLACEMENTS } from "@/lib/constants/materialPlacements";
import { mapMaterialsToFilterItems } from "@/lib/mappers/materials";
import { SanityImage } from "@/sanity/image/SanityImage";
import { sanityFetch } from "@/sanity/live";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { aboutUsQuery } from "@/sanity/queries/aboutUs";
import { materialsQuery } from "@/sanity/queries/materials";
import { getMaterialsByPlacement } from "@/sanity/queries/materialsByPlacement";
import type { Img } from "@/sanity/typegen";

type AboutUsData = {
  missionDescription?: string | null;
  missionImage?: Img | null;
  meaningCards?: Array<{
    _key?: string;
    image?: Img | null;
    description?: string | null;
  }> | null;
  galleryImages?: Array<Img | null> | null;
  teamMembers?: Array<{
    _key?: string;
    name?: string | null;
    role?: string | null;
    photo?: Img | null;
  }> | null;
};

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: aboutUsQuery });
  return mapMetadata(data);
}

const AboutUsPage = async () => {
  const [{ data: aboutUsData }, { data: materialsData }] = await Promise.all([
    sanityFetch({ query: aboutUsQuery }),
    sanityFetch({ query: materialsQuery }),
  ]);

  const aboutUs = (aboutUsData ?? {}) as AboutUsData;
  const materials = materialsData ?? [];

  const mediaMaterials = mapMaterialsToFilterItems(
    getMaterialsByPlacement(materials, MATERIAL_PLACEMENTS.ABOUT_US_MEDIA)
  );
  const docsMaterials = mapMaterialsToFilterItems(
    getMaterialsByPlacement(materials, MATERIAL_PLACEMENTS.ABOUT_US_DOCS)
  );

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-10">
      <div className="space-y-10 sm:space-y-12 mx-auto max-w-6xl container">
        <h1 className="font-bold text-3xl sm:text-4xl">O nas</h1>

        <div className="items-center gap-6 sm:gap-8 grid md:grid-cols-2">
          <div>
            <h2 className="font-bold text-xl sm:text-2xl">Misja i wizja</h2>
            <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed">
              {aboutUs.missionDescription ?? "Opis misji i wizji fundacji."}
            </p>
          </div>
          <div className="bg-sunken border border-subtle rounded-xl aspect-4/3 overflow-hidden">
            {aboutUs.missionImage ? (
              <SanityImage
                image={aboutUs.missionImage}
                width={720}
                height={540}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full text-muted text-xs sm:text-sm">
                [MISJA I WIZJA]
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-xl sm:text-2xl">Nazwa, która znaczy więcej niż słowo</h2>
          <div className="gap-4 sm:gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5">
            {(aboutUs.meaningCards ?? []).map((card, index) => (
              <article key={card._key ?? `meaning-card-${index}`} className="space-y-3">
                <div className="bg-sunken border border-subtle rounded-md h-12 overflow-hidden">
                  {card.image ? (
                    <SanityImage
                      image={card.image}
                      width={320}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full text-[10px] text-muted sm:text-xs">
                      [KARTA]
                    </div>
                  )}
                </div>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  {card.description ?? "Opis karty."}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-bold text-xl sm:text-2xl">Galeria</h2>
          <div className="gap-3 sm:gap-4 grid grid-cols-2 md:grid-cols-3">
            {(aboutUs.galleryImages ?? []).slice(0, 6).map((image, index) => (
              <div
                key={`gallery-${index}`}
                className="bg-sunken border border-subtle rounded-xl aspect-3/2 overflow-hidden"
              >
                {image ? (
                  <SanityImage
                    image={image}
                    width={640}
                    height={426}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-muted text-xs">
                    [IMG {index + 1}]
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-bold text-lg sm:text-xl">Zespół</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {(aboutUs.teamMembers ?? []).map((member, index) => (
              <TeamMemberCard
                key={member._key ?? `member-${index}`}
                name={member.name ?? `Imię Nazwisko ${index + 1}`}
                role={member.role ?? "[ROLA W FUNDACJI]"}
                photo={member.photo}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-bold text-lg sm:text-xl">Dla mediów i partnerów</h2>
          {mediaMaterials.length > 0 ? (
            <MaterialySection materials={mediaMaterials} />
          ) : (
            <p className="text-muted text-sm">Brak materiałów dla tej sekcji.</p>
          )}
        </div>

        <div>
          <h2 className="mb-3 font-bold text-lg sm:text-xl">Dokumenty fundacji</h2>
          {docsMaterials.length > 0 ? (
            <MaterialySection materials={docsMaterials} />
          ) : (
            <p className="text-muted text-sm">Brak materiałów dla tej sekcji.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
