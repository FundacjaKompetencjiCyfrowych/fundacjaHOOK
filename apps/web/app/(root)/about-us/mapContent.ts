import type { AboutUsQueryResult } from "@/sanity/typegen";

import type { AboutUsPageContent } from "./types";

export function mapContent(data: AboutUsQueryResult): AboutUsPageContent {
  return {
    mission: data?.mission
      ? {
          description: data.mission.description ?? null,
          image: data.mission.image ?? null,
        }
      : null,
    meaningCards:
      data?.meaningCards?.flatMap((card) =>
        card.title && card.description
          ? [
              {
                _key: card._key,
                title: card.title,
                description: card.description,
                image: card.image ?? null,
              },
            ]
          : []
      ) ?? [],
    galleryImages:
      data?.galleryImages?.flatMap((image) => (image.asset ? [{ _key: image._key, image }] : [])) ??
      [],
    teamMembers:
      data?.teamMembers?.flatMap((member) =>
        member.name && member.role
          ? [
              {
                _key: member._key,
                name: member.name,
                role: member.role,
                photo: member.photo ?? null,
              },
            ]
          : []
      ) ?? [],
  };
}
