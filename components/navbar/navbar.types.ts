import { IRouteType } from "@/common/types";

export interface INavbarProps {
  routes: IRouteType[];
}

// DUMMY DATA FOR CURRENT LOGGED IN USER

export const profileData = {
  firstName: "Kiran",
  lastName: "Mehta",
  profileImage: "",
  designation: "Associate Talent Acquisition",
  email: "kiran.mehta@coditas.com",
  phone: "(91) 9898775555",
};
