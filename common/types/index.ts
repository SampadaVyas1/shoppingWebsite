import { MESSAGE_STATUS } from "./enums";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export interface IRouteType {
  id: number;
  path: string;
  name: string;
}

export interface ISentMessage {
  messageId: string;
  message?: string;
  timestamp: string;
  messageType: string;
  mediaUrl?: string | File | null;
  status?: MESSAGE_STATUS;
  to: string;
  from: string;
  phone?: string;
  caption?: string;
  fileName?: string;
  file?:any
}
export interface IOptionType {
  id: number;
  label: string;
}
export type HTMLPropOmit = "onChange" | "onFocus" | "onBlur";
export type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLPropOmit
>;
export type HTMLTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLPropOmit
>;
export type HTMLProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;
export type HTMLInputTextareaProps = Omit<HTMLProps, HTMLPropOmit>;
export interface INavbarProps {
  routes: IRouteType[];
}

export interface IEmptyStateType {
  title?: string;
  image: string;
  subTitle?: string;
  customImageStyle?: string;
  heading?: string;
}

export interface ITechStackList {
  id: number;
  name: string;
  totalCandidates: number;
  activeCandidates: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IRecruitersList {
  candidates: number;
  createdAt: string;
  deletedAt: string;
  designation: string;
  email: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  id: string;
  isActive: boolean;
  mobileNumber: string;
  role: string;
  techStack: string[];
  updatedAt: string;
  userImageUrl: string;
  freshLogin: string;
  name?: string;
  status?: string;
}

export interface IUserData {
  firstLogin: boolean;
  firstName: string;
  lastName: string;
  employeeId: number;
  email: string;
  designation: string;
  role: string;
  userImageUrl: string;
  mobileNumber?: string;
}
