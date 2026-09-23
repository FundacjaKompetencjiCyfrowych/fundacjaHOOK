"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { SanityImage } from "@/sanity/image/SanityImage";

import type { SanityImageContent } from "../types";

type GalleryImage = {
  _key: string;
  image: SanityImageContent;
};

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  function close() {
    setSelectedIndex(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      <div className="gap-4 grid grid-cols-2 md:grid-cols-3 mt-3">
        {images.map((galleryImage, index) => (
          <button
            key={galleryImage._key}
            type="button"
            className="rounded-xl aspect-[373/160] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-hidden cursor-zoom-in"
            aria-label={`Powiększ zdjęcie ${index + 1}`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setSelectedIndex(index);
            }}
          >
            <SanityImage
              image={galleryImage.image}
              width={373}
              height={160}
              className="w-full h-40 object-cover"
              style={{ width: "100%", maxWidth: "100%", height: "100%", maxHeight: "100%" }}
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/75 p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-dialog-title"
        >
          <button
            type="button"
            aria-label="Zamknij podgląd zdjęcia"
            className="z-0 absolute inset-0 cursor-default"
            onClick={close}
          />
          <div className="z-10 relative max-w-full max-h-[85vh]">
            <h3 id="gallery-dialog-title" className="sr-only">
              Podgląd zdjęcia
            </h3>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Zamknij podgląd zdjęcia"
              className="top-4 right-4 z-20 fixed inline-flex justify-center items-center bg-black/60 hover:bg-black/80 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-10 h-10 text-white transition-colors"
              onClick={close}
            >
              <X className="w-5 h-5" />
            </button>
            <SanityImage
              image={selectedImage.image}
              alt={`Podgląd zdjęcia ${(selectedIndex ?? 0) + 1}`}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              style={{ display: "block", maxWidth: "100%", maxHeight: "85vh" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
