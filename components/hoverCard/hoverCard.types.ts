import { ARROW_ALIGNMENT, TOOLTIP_POSITION } from "@/common/types/enums";

export type IPositions =
  | TOOLTIP_POSITION.BOTTOM
  | TOOLTIP_POSITION.LEFT
  | TOOLTIP_POSITION.TOP
  | TOOLTIP_POSITION.RIGHT;

export interface IHoverCardProps {
  children: JSX.Element;
  component: JSX.Element;
  customStyle?: string;
  customTipStyle?: string;
  containerPosition?: IPositions[];
  tipPosition?: IPositions;
  arrowAlign?:
    | ARROW_ALIGNMENT.START
    | ARROW_ALIGNMENT.END
    | ARROW_ALIGNMENT.CENTER;
}
