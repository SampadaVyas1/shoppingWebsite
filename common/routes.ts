export const PRIVATE_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  NOT_FOUND_ROUTE: "/_error",
};

export const RECRUITER_ROUTES = [
  { id: 0, path: "/", name: "Dashboard" },
  { id: 1, path: "/messages", name: "Messages" },
  { id: 2, path: "/candidates", name: "Candidates" },
];

export const ADMIN_ROUTES = [
  ...RECRUITER_ROUTES,
  { id: 3, path: "/team", name: "Team" },
];

export enum API_ROUTES {
  LOGIN = "gauth/auth/login",
  GET_ACCESS_TOKEN = "gauth/auth/getNewAccessToken",
  CHECK_TOKEN = "gauth/auth/checkToken",
  GET_ALL_TEMPLATES = "/wa/whatsapp/getAllTemplates",
  GET_CANDIDATES = `tpi/candidate/getAllCandidates`,
  GET_FILTER = "tpi/filters/getAllFilters",
  ADD_CANDIDATES = "tpi/candidate/createCandidate",
}

export const TEAM_PAGE_ROUTES = {
  TEAM: "/team",
  RECRUITERS: "/team/recruiters",
  TECHSTACKS: "/team/techstacks",
  TEMPLATES: "/team/templates",
};

export const TEAM_ROUTES = [
  { id: 1, path: TEAM_PAGE_ROUTES.RECRUITERS, name: "Recruiters" },
  { id: 2, path: TEAM_PAGE_ROUTES.TECHSTACKS, name: "Tech Stacks" },
  { id: 3, path: TEAM_PAGE_ROUTES.TEMPLATES, name: "Templates" },
];
