import ContentItem, { type ContentItemType } from "./ContentItem";

export default function MaterialySection({ materials }: { materials: ContentItemType[] }) {
  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="space-y-3">
          {materials.map((material) => (
            <ContentItem key={`${material.title}-${material.date}`} material={material} />
          ))}
        </div>
      </div>
    </section>
  );
}
