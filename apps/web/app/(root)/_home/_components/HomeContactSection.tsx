import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Typography } from "@/app/_components/ui/typography";

type ButtonData = {
  _id?: string;
  text?: string | null;
  href?: string | null;
};

export default function HomeContactSection({
  title,
  description,
  button,
}: {
  title?: string | null;
  description?: string | null;
  button?: ButtonData | null;
}) {
  return (
    <section className="wire-section border-b border-subtle px-4 pb-6 pt-14 sm:px-6">
      <div className="mx-auto flex max-w-[668px] flex-col items-center text-center">
        <Typography
          as="h2"
          variant="h4"
          weight="bold"
          className="text-[22px] leading-[1.1] tracking-[0.01em]"
        >
          {title}
        </Typography>
        {description ? (
          <Typography variant="body" className="mt-2 text-muted">
            {description}
          </Typography>
        ) : null}
        {button?.href && button.text ? (
          <Button asChild className="mt-4">
            <Link
              href={button.href}
              target={button.href.startsWith("/") ? undefined : "_blank"}
              rel={button.href.startsWith("/") ? undefined : "noopener noreferrer"}
            >
              {button.text}
            </Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
