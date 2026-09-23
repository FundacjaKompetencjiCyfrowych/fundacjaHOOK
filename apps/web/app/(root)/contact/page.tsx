import ContactForm from "@/app/_components/ContactForm";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { sanityFetch } from "@/sanity/live";
import { contactPageQuery } from "@/sanity/queries/contactPage";

export default async function ContactPage() {
  const { data: pageData } = await sanityFetch({
    query: contactPageQuery,
  });

  const page = pageData?.page;
  const orgDetails = pageData?.orgDetails;

  return (
    <>
      <Breadcrumbs segments={[{ label: "Kontakt" }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <PageTitle>{"Kontakt"}</PageTitle>

          <div className="grid grid-cols-1 items-start gap-10 mt-6 md:grid-cols-2 lg:gap-16">
            <div>
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                {page?.departments && page.departments.length > 0 ? (
                  page.departments.map((dept, index) => (
                    <div key={index} className="bg-sunken rounded-xl px-4 py-3">
                      <h3 className="font-bold text-base text-foreground">{dept.name}</h3>
                      {dept.email && <p className="text-sm text-muted">{dept.email}</p>}
                      {dept.phone && <p className="text-sm text-muted">{dept.phone}</p>}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-sunken rounded-xl px-4 py-3">
                      <h3 className="font-bold text-base text-foreground">Dział A</h3>
                      <p className="text-sm text-muted">email@fundacja.pl</p>
                      <p className="text-sm text-muted">+48 000 000 000</p>
                    </div>
                    <div className="bg-sunken rounded-xl px-4 py-3">
                      <h3 className="font-bold text-base text-foreground">Dział B</h3>
                      <p className="text-sm text-muted">email@fundacja.pl</p>
                      <p className="text-sm text-muted">+48 000 000 000</p>
                    </div>
                    <div className="bg-sunken rounded-xl px-4 py-3">
                      <h3 className="font-bold text-base text-foreground">Dział C</h3>
                      <p className="text-sm text-muted">email@fundacja.pl</p>
                      <p className="text-sm text-muted">+48 000 000 000</p>
                    </div>
                  </>
                )}
              </div>

              <hr className="border-subtle my-6" />

              <div className="text-sm text-main space-y-1 font-medium">
                <p>
                  <span className="font-bold">Pełna nazwa:</span>{" "}
                  {orgDetails?.fullName ?? "[NAZWA FUNDACJI]"}
                </p>
                <p>
                  <span className="font-bold">Adres:</span> {orgDetails?.address ?? "[ADRES]"}
                </p>
                <p>
                  <span className="font-bold">KRS:</span> {orgDetails?.krs ?? "[0000000000]"}
                </p>
                <p>
                  <span className="font-bold">NIP:</span> {orgDetails?.nip ?? "[000-000-00-00]"}
                </p>
                <p>
                  <span className="font-bold">REGON:</span> {orgDetails?.regon ?? "[000000000]"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
