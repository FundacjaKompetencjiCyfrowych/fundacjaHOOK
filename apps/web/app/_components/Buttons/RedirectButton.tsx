import Link from "next/link";

export default function RedirectButton({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center bg-brand-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand-onhover transition-colors"
    >
      {text}
    </Link>
  );
}
