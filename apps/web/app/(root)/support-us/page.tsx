import type { Metadata } from "next";
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
    <section className="px-4 sm:px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl container">
        <h1 className="mb-8 font-bold text-3xl sm:text-4xl">Wesprzyj nas</h1>

        <div className="pb-10 border-subtle border-b">
          <h2 className="font-bold text-2xl">Dołącz jako wolontariusz</h2>
          <p className="mt-3 max-w-3xl text-muted">{description}</p>
          <div className="mt-6">
            <RedirectButton href={buttonHref} text={buttonText} />
          </div>
        </div>

        <div className="pt-10">
          <h2 className="font-bold text-2xl">Wpłaty</h2>
          <p className="mt-3 text-muted">Informacje o przelewach bankowych.</p>

          <div className="mt-4 p-5 border border-subtle border-dashed text-muted text-base">
            <p>Numer konta: {accountNumber}</p>
            <p className="mt-1">KRS: {krs}</p>
            <p className="mt-1">Tytuł przelewu: {transferTitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportUsPage;
