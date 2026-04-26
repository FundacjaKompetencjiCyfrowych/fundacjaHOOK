import { PresentationPluginOptions } from "sanity/presentation";

const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

export const presentationConfig: PresentationPluginOptions = {
  previewUrl: {
    draftMode: {
      enable: `${SANITY_STUDIO_PREVIEW_URL}/api/draft-mode/enable`,
    },
    previewMode: {
      enable: `${SANITY_STUDIO_PREVIEW_URL}/api/draft-mode/disable`,
    },
  },
};
