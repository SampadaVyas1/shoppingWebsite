import { useEffect } from "react";
import { useRouter } from "next/router";
import { TEAM_PAGE_ROUTES } from "@/common/constants";

const Team = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(TEAM_PAGE_ROUTES.RECRUITERS);
  });
  return <>Team</>;
};
export default Team;
