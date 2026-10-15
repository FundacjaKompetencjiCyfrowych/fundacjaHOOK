"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    L?: any;
  }
}

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

function loadLeaflet() {
  return new Promise<void>((resolve, reject) => {
    if (window.L) return resolve();

    const current = document.querySelector<HTMLScriptElement>(`script[src="${LEAFLET_JS}"]`);
    const script = current ?? document.createElement("script");
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", () => reject(new Error("Nie udało się załadować Leaflet.")), {
      once: true,
    });
    if (!current) {
      script.src = LEAFLET_JS;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

function ensureLeafletCss() {
  if (document.querySelector(`link[href="${LEAFLET_CSS}"]`)) return;
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = LEAFLET_CSS;
  document.head.appendChild(css);
}

export function WorkshopMap({ lat, lng, address }: { lat: number; lng: number; address: string }) {
  const mapElement = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let disposed = false;
    let map: any;
    setFailed(false);
    setLoading(true);

    const initializeMap = async () => {
      try {
        ensureLeafletCss();
        await loadLeaflet();
        if (disposed || !mapElement.current || !window.L) return;

        const leaflet = window.L;
        map = leaflet.map(mapElement.current, {
          center: [lat, lng],
          zoom: 16,
          scrollWheelZoom: false,
        });
        leaflet
          .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          })
          .addTo(map)
          .once("load", () => {
            if (!disposed) setLoading(false);
          });
        leaflet.marker([lat, lng]).addTo(map).bindPopup(address);
        window.requestAnimationFrame(() => {
          if (!disposed) map?.invalidateSize();
        });
      } catch {
        if (!disposed) {
          setFailed(true);
          setLoading(false);
        }
      }
    };

    void initializeMap();
    return () => {
      disposed = true;
      map?.remove();
    };
  }, [lat, lng, address]);

  useEffect(() => {
    if (!loading) return;
    const timeout = window.setTimeout(() => {
      setFailed(true);
      setLoading(false);
    }, 10000);
    return () => window.clearTimeout(timeout);
  }, [loading]);

  return (
    <div className="relative mt-3 h-28 overflow-hidden rounded-lg bg-elevated sm:h-64">
      <div
        ref={mapElement}
        className="h-full w-full"
        role="application"
        aria-label={`Interaktywna mapa lokalizacji warsztatu: ${address}`}
      />
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-elevated/90 px-4 text-center text-sm text-muted-foreground">
          Mapa jest chwilowo niedostępna. Skorzystaj z linku do mapy poniżej.
        </div>
      )}
    </div>
  );
}
