import { News } from "@/sanity/typegen";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SanityImage } from "@/sanity/image/SanityImage";
import { formatDate } from "@/lib/formatDate";

interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => {
  return (
    <Link href={`/news/${news.slug?.current || "not-found"}`}>
      <Card className="relative gap-2 shadow-md hover:shadow-lg mx-auto pt-0 w-full max-w-142 transition-shadow cursor-pointer">
        <div className="relative mx-4 mt-4 h-32 min-w-0 overflow-hidden rounded-xl">
          <SanityImage image={news.image} width={536} height={128} fill className="object-cover" />
        </div>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm leading-[1.15]">
            <span>{news.title}</span>
            <time
              dateTime={news._createdAt}
              className="shrink-0 text-xs font-normal text-muted-foreground"
            >
              {formatDate(news._createdAt)}
            </time>
          </CardTitle>
          <CardDescription className="text-xs leading-[1.4] tracking-[0.02em] text-muted">
            {news.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default NewsCard;
