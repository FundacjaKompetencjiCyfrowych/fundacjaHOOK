import { SanityImage } from "@/sanity/image/SanityImage";

export default function Hero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: { [key: string]: any };
}) {
  return (
    <section className="py-8 px-4 border-b border-subtle">
      <div className="container mx-auto">
        <div className="relative h-64 mt-4 mb-6 rounded-xl border border-dashed border-subtle bg-placeholder flex items-center justify-center overflow-hidden">
          <SanityImage image={image} fill className="object-cover" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-muted max-w-xl">{subtitle}</p>
      </div>
    </section>
  );
}
