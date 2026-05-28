import ContentItem, { type ContentItemType } from "./LandingPage/ContentItem";

export default function MaterialySection({ materials }: { materials: ContentItemType[] }) {
  return (
    <div className="space-y-3">
      {materials.map((material) => (
        <ContentItem key={`${material.title}-${material.date}`} material={material} />
      ))}
    </div>
  );
}
