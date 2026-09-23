export type TextImageCard = {
  _key: string;
  title: string;
  description: string;
  image: SanityImageContent | null;
};

export type PersonProfile = {
  _key: string;
  name: string;
  role: string;
  photo: SanityImageContent | null;
};

export type MissionContent = {
  description: string | null;
  image: SanityImageContent | null;
};

export type SanityImageContent = {
  asset?: unknown;
  crop?: unknown;
  hotspot?: unknown;
};

export type AboutUsPageContent = {
  mission: MissionContent | null;
  meaningCards: TextImageCard[];
  galleryImages: Array<{ _key: string; image: SanityImageContent }>;
  teamMembers: PersonProfile[];
};
