"use client";

import { useState } from "react";
import NewsCard from "@/app/_components/Cards/NewsCard";
import { News } from "@/sanity/typegen";

interface Props {
  initialNews: News[];
}

const NewsPageClient = ({ initialNews }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const visibleNews = showAll ? initialNews : initialNews.slice(0, 3);

  return (
    <section className="wire-section">
      <div className="mx-auto container">
        <h1 className="mt-2 mb-6 font-bold text-2xl">Aktualności</h1>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          {visibleNews.map((item) => (
            <NewsCard key={item._id} news={item} />
          ))}
        </div>
        {initialNews.length > 3 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-brand-primary hover:bg-brand-onhover px-6 py-2 rounded-lg font-medium text-white transition-colors"
            >
              {showAll ? "Zobacz mniej" : "Załaduj więcej"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsPageClient;
