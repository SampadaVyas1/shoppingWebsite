import { ImgHTMLAttributes } from "react";

export interface IImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "children"> {
  src: string | null;
  fallbackText?: string;
  customClass?: string;
  fallbackClass?: string;
}
