import MaterialySection from "@/app/_components/Sections/LandingPage/MaterialySection";

const demoMaterials = [
  {
    title: "Przewodnik po warsztatach",
    date: "2025-03-15",
    description: "Kompletny przewodnik dla uczestników",
    fileUrl: "https://example.com/warsztaty/przewodnik-po-warsztatach.pdf",
    format: "PDF",
    size: "1.2 MB",
  },
  {
    title: "Infografika: Stres",
    date: "2025-03-01",
    description: "Wizualne podsumowanie technik relaksacji",
    fileUrl: "https://example.com/warsztaty/infografika-stres.pdf",
    format: "Link",
    size: "640 KB",
  },
  {
    title: "Materiały szkoleniowe",
    date: "2025-02-10",
    description: "Zestaw ćwiczeń i zadań praktycznych",
    fileUrl: "https://example.com/warsztaty/materialy-szkoleniowe.pdf",
    format: "PDF",
    size: "850 KB",
  },
  {
    title: "Poradnik mentora",
    date: "2025-01-20",
    description: "Wskazówki dla mentorów i prowadzących",
    fileUrl: "https://example.com/warsztaty/poradnik-mentora.pdf",
    format: "PDF",
    size: "2.1 MB",
  },
  {
    title: "Nagranie z webinaru",
    date: "2025-01-05",
    description: "Pełne nagranie sesji o finansach",
    fileUrl: "https://example.com/warsztaty/nagranie-z-webinaru.mp4",
    format: "MP4",
    size: "128 MB",
  },
  {
    title: "Raport z badań",
    date: "2024-12-01",
    description: "Wyniki badań dotyczących efektywności programów",
    fileUrl: "https://example.com/warsztaty/raport-z-badan.pdf",
    format: "PDF",
    size: "3.4 MB",
  },
  {
    title: "Arkusz samooceny",
    date: "2024-11-05",
    description: "Narzędzie do oceny własnych postępów",
    fileUrl: "https://example.com/warsztaty/arkusz-samooceny.zip",
    format: "ZIP",
    size: "420 KB",
  },
  {
    title: "Szablon CV",
    date: "2024-10-15",
    description: "Gotowy szablon do wypełnienia",
    fileUrl: "https://example.com/warsztaty/szablon-cv.zip",
    format: "ZIP",
    size: "180 KB",
  },
] as const;

export default function WarsztatyPage() {
  return <MaterialySection materials={[...demoMaterials]} />;
}
