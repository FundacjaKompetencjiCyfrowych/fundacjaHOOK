import { ComponentProps, ElementType } from "react";
import { SanityImage as Image } from "sanity-image";

type SanityImageProps = {
  image?: { [key: string]: any } | null;
  preview?: boolean;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  mode?: "cover" | "contain";
  className?: string;
  as?: ElementType;
} & ComponentProps<"img">;

/**
 * Component for rendering Sanity images
 * @see https://www.sanity.io/plugins/sanity-image
 */
export function SanityImage({ image, preview, ...props }: SanityImageProps) {
  if (!image?.asset) {
    console.warn("Missing Sanity image object in SanityImage component");
    return null;
  }
  const id = image.asset?._ref ?? image.asset?._id ?? "";
  const alt = props.alt ?? image.asset?.altText ?? image.alt ?? "";
  const { fill, style, width, height, ...restProps } = props;

  if (preview && typeof window === "undefined") {
    throw new Error("Image preview can only be used in client components");
  }

  const isSvg = id.toLowerCase().includes("svg") || image.asset?.extension === "svg";

  const mergedStyle = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
        ...style,
      }
    : {
        ...(width ? { width: `${width}px`, maxWidth: `${width}px` } : {}),
        ...(height ? { height: `${height}px`, maxHeight: `${height}px` } : {}),
        ...style,
      };

  return (
    <Image
      id={id}
      alt={alt}
      width={width}
      height={height}
      hotspot={image.hotspot}
      crop={image.crop}
      preview={preview && image.asset?.metadata?.lqip}
      projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
      dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      queryParams={isSvg ? {} : { fm: "webp" }}
      style={mergedStyle}
      {...restProps}
    ></Image>
  );
}
