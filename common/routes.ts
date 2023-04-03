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
  { id: 1, path: "/team/groups", name: "Groups" },
  { id: 2, path: "/team/recruiters", name: "Recruiters" },
  { id: 3, path: "/team/techstacks", name: "Tech Stacks" },
  { id: 4, path: "/team/templates", name: "Templates" },
];
