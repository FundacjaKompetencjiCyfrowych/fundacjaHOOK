/**
 * Social media links configuration
 * TODO: These links should be fetched from Sanity settings in the future
 */
export const SOCIAL_LINKS = [
  ["f", "#"],
  ["in", "#"],
  ["ig", "#"],
] as const;

export type SocialLink = (typeof SOCIAL_LINKS)[number];
