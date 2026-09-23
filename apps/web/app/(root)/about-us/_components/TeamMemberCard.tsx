import { SanityImage } from "@/sanity/image/SanityImage";

import type { PersonProfile } from "../types";

export default function TeamMemberCard({ member }: { member: PersonProfile }) {
  return (
    <article className="flex flex-col items-center bg-brand-primary shadow-sm px-4 py-4 border border-subtle rounded-lg h-[162px] text-center">
      {member.photo ? (
        <SanityImage
          image={member.photo}
          alt={member.name}
          width={80}
          height={80}
          className="rounded-xl w-20 h-20 object-cover"
        />
      ) : null}
      <p className="mt-1 font-bold text-sm text-white">{member.name}</p>
      <p className="text-white/80 text-xs">{member.role}</p>
    </article>
  );
}
