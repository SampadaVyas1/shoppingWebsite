import { TEAM_PAGE_ROUTES } from "./constants";

export const PRIVATE_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  404: "/_error",
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
  LOGIN = "/auth/login",
  GET_ACCESS_TOKEN = "/auth/getNewAccessToken",
  CHECK_TOKEN = "/auth/checkToken",
}

export const TEAM_ROUTES = [
  { id: 1, path: TEAM_PAGE_ROUTES.groups, name: "Groups" },
  { id: 2, path: TEAM_PAGE_ROUTES.recruiters, name: "Recruiters" },
  { id: 3, path: TEAM_PAGE_ROUTES.techstacks, name: "Tech Stacks" },
  { id: 4, path: TEAM_PAGE_ROUTES.templates, name: "Templates" },
];
