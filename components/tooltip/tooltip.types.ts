import { TOOLTIP_POSITION } from "@/common/enums";

export interface ITooltipProp {
  children: JSX.Element;
  delay?: number;
  position:
    | TOOLTIP_POSITION.TOP
    | TOOLTIP_POSITION.BOTTOM
    | TOOLTIP_POSITION.LEFT
    | TOOLTIP_POSITION.RIGHT;
  content: JSX.Element;
  customStyle?: string;
}
