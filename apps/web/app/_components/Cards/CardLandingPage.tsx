import Image from "next/image";

export default function CardLandingPage({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-xl overflow-hidden transition-all duration-200 shadow-md bg-elevated hover:-translate-y-0.5">
      <Image src={image} alt={title} width={48} height={48} />
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted mb-3">{description}</p>
    </div>
  );
}
