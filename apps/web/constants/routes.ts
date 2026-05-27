const ROUTES = {
  HOME: "/",
  WORKSHOPS: "/workshops",
  WORKSHOP: (id: string) => `/workshops/${id}`,
  ABOUT_US: "about-us",
  CONTACT: "contact",
  MATERIALS: "/materials",
  NEWS: "/news",
  NEWS_ARTICLE: (id: string) => `/news/${id}`,
  PROJECTS: "/projects",
  PROJECT: (id: string) => `/news/${id}`,
  SUPPORT_US: "/support-us",
};

export default ROUTES;
