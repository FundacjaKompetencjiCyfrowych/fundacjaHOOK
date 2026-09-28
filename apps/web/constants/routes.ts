// TODO: Cleanup routes and ask what should privacy policy and information clause be

const ROUTES = {
  HOME: "/",
  WORKSHOPS: "/workshops",
  WORKSHOP: (id: string) => `/workshops/${id}`,
  ABOUT_US: "/about-us",
  CONTACT: "/contact",
  MATERIALS: "/materials",
  NEWS: "/news",
  NEWS_ARTICLE: (id: string) => `/news/${id}`,
  PROJECTS: "/projects",
  PROJECT: (id: string) => `/projects/${id}`,
  SUPPORT_US: "/support-us",
  PRIVACY_POLICY: "#",
  INFORMATION_CLAUSE: "#",
};

export default ROUTES;
