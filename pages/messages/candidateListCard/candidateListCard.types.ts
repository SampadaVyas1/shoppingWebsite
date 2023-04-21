import { MESSAGE_STATUS } from "@/common/enums";

export interface ICandidateListCardProps {
  id?: string;
  status?:
    | MESSAGE_STATUS.DELIVERED
    | MESSAGE_STATUS.READ
    | MESSAGE_STATUS.RECEIVED
    | MESSAGE_STATUS.SENT;
  time: string;
  profilePhoto: string;
  name: string;
  mobile: string;
  message?: string;
  unreadCount?: number;
  onClick?: () => void;
  isSelected?: boolean;
}
