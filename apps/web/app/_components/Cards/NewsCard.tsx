import { News } from "@/sanity/typegen";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SanityImage } from "@/sanity/image/SanityImage";

interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => {
  return (
    <a href={`/news/${news.slug?.current || "not-found"}`}>
      <Card className="relative gap-2 shadow-md hover:shadow-lg mx-auto pt-0 w-full max-w-142 transition-shadow cursor-pointer">
        <div className="px-4 pt-4">
          <SanityImage
            image={news.image}
            width={536}
            height={128}
            className="rounded-xl w-full h-32 object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-bold">{news.title}</CardTitle>
          <CardDescription>{news.description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
};

export default NewsCard;
