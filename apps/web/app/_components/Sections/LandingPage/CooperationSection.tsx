import RedirectButton from "@/app/_components/Buttons/RedirectButton";

type ButtonData = {
  _id?: string;
  text?: string | null;
  href?: string | null;
};

export default function CooperationSection({
  title,
  description,
  button,
}: {
  title?: string | null;
  description?: string | null;
  button?: ButtonData | null;
}) {
  return (
    <section className="wire-section px-4 py-12 sm:py-16 border-b border-subtle">
      <div className="container mx-auto max-w-2xl rounded-2xl px-6 py-8 sm:px-8 sm:py-10">
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        {description ? <p className="mb-6 text-sm text-muted">{description}</p> : null}
        {button?.href && button.text ? (
          <RedirectButton href={button.href} text={button.text} />
        ) : null}
      </div>
    </section>
  );
}
