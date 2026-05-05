import Image from "next/image";
import Link from "next/link";

export default function CardWithRedirect({
  title,
  image,
  description,
  href,
  hrefText,
}: {
  title: string;
  image: string;
  description: string;
  href: string;
  hrefText: string;
}) {
  return (
    <div className="p-4 rounded-xl overflow-hidden transition-all duration-200 shadow-md bg-elevated hover:-translate-y-0.5">
      <Image src={image} alt={title} width={400} height={300} />
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted mb-3">{description}</p>
      <Link href={href} className="text-primary text-xs font-semibold hover:underline">
        {hrefText} &gt;
      </Link>
    </div>
  );
}
