import { ORIENTATIONS } from "@/common/enums";

export interface IButtonGroupProps {
  buttons: string[];
  orientation?: ORIENTATIONS.VERTICAL | ORIENTATIONS.HORIZONTAL;
  onButtonClick?: (event: any) => void;
  containerClassName?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
}
