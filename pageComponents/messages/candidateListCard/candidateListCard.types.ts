import { MESSAGE_STATUS } from "@/common/enums";

export interface ICandidateListCardProps {
  id?: string;
  time: string;
  profilePhoto: string;
  name: string;
  mobile: string;
  status?: MESSAGE_STATUS;
  message?: string;
  unreadCount?: number;
  onClick?: () => void;
  isSelected?: boolean;
}
