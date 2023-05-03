import { TOOLTIP_POSITION } from "@/common/enums";
import { MESSAGE_STATUS_VARIANT } from "@/common/socketConstants";

export interface ITipContainerProps {
  children: JSX.Element;
  position?: TOOLTIP_POSITION.LEFT | TOOLTIP_POSITION.RIGHT;
  customStyles?: string;
  variant?: MESSAGE_STATUS_VARIANT.SENT | MESSAGE_STATUS_VARIANT.RECEIVED;
}
