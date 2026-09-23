import type { Metadata } from "next";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import RedirectButton from "@/app/_components/Buttons/RedirectButton";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { supportUsQuery } from "@/sanity/queries/supportUs";
import { settingsQuery } from "@/sanity/queries/settings";
import { sanityFetch } from "@/sanity/live";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: supportUsQuery });
  return mapMetadata(data);
}

const SupportUsPage = async () => {
  const [{ data: supportUsData }, { data: settingsData }] = await Promise.all([
    sanityFetch({ query: supportUsQuery }),
    sanityFetch({ query: settingsQuery }),
  ]);

  const description =
    supportUsData?.volunteerDescription ??
    "Opis możliwości wolontariatu w fundacji. Dołącz do naszego zespołu i wspieraj nasze działania.";
  const buttonText = supportUsData?.volunteerButton?.text ?? "Zostań wolontariuszem";
  const buttonHref = supportUsData?.volunteerButton?.href ?? "#";
  const accountNumber = supportUsData?.accountNumber ?? "00 0000 0000 0000 0000 0000 0000";
  const transferTitle = supportUsData?.transferTitle ?? "DAROWIZNA";
  const krs = settingsData?.krs ?? "0000000000";

  return (
    <>
      <Breadcrumbs segments={[{ label: "Wesprzyj nas" }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <PageTitle>Wesprzyj nas</PageTitle>

          <div className="mt-6 flex flex-col items-start gap-2 pb-10 border-subtle border-b">
            <h2 className="font-medium text-base text-main leading-[1.1]">
              Dołącz jako wolontariusz
            </h2>
            <p className="max-w-3xl pb-2 text-base text-muted tracking-[-0.01em] leading-[1.1]">
              {description}
            </p>
            <RedirectButton
              href={buttonHref}
              text={buttonText}
              className="h-[38px] rounded-xl px-[18px] py-[10px] font-medium leading-[1.15]"
            />
          </div>

          <div className="flex flex-col items-start gap-2 pt-[41px]">
            <h2 className="font-medium text-base text-main leading-[1.1]">
              <span className="hidden md:inline">Wesprzyj nas finansowo</span>
              <span className="md:hidden">Wpłaty</span>
            </h2>
            <p className="text-base text-muted tracking-[-0.01em] leading-[1.1]">
              Informacje o przelewach bankowych.
            </p>

            <div className="w-full border border-subtle border-dashed p-[17px] text-muted text-sm leading-5">
              <p>Numer konta: {accountNumber}</p>
              <p>KRS: {krs}</p>
              <p>Tytuł przelewu: {transferTitle}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportUsPage;
