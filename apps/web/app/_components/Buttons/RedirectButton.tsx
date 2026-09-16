import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RedirectButton({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center bg-brand-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand-onhover transition-colors",
        className
      )}
    >
      {text}
    </Link>
  );
}
