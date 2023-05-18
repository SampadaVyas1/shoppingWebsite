import { MESSAGE_STATUS } from "@/common/types/enums";

export interface ICandidateListCardProps {
  id?: string;
  time?: string;
  profilePhoto: string;
  name: string;
  mobile: string;
  status?: MESSAGE_STATUS;
  message?: string;
  interviewName?: string;
  interviewStatus?: string;
  postingTitle?: string;
  techStack?: string[];
  unreadCount?: number;
  onClick?: () => void;
  isSelected?: boolean;
}
