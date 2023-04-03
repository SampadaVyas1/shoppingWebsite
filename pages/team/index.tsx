import { useRouter } from "next/router";
import { useEffect } from "react";

const Team = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/team/recruiters");
  });
  return <>Team</>;
};
export default Team;
