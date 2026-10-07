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
  LEGAL_PAGE: (slug: string) => `/legal/${slug}`,
};

export default ROUTES;
