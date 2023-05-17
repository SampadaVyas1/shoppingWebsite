import { EVENT } from "@/common/types/enums";
import { HTMLAttributes } from "react";

export interface IClickAwayProps extends HTMLAttributes<HTMLDivElement> {
  event?:
    | EVENT.CLICK
    | EVENT.MOUSE_DOWN
    | EVENT.MOUSE_UP
    | EVENT.POINTER_DOWN
    | EVENT.POINTER_UP;
  children: React.ReactNode;
  handleClose: () => void;
  customClass?: string;
}
