import { SKELETON_VARIANT } from "@/common/types/enums";

export interface ISkeletonLoaderProps {
  type:
    | SKELETON_VARIANT.CIRCLE
    | SKELETON_VARIANT.TEXT_LARGE
    | SKELETON_VARIANT.TEXT_MEDIUM
    | SKELETON_VARIANT.TEXT_SMALL;
  customClass?: string;
}
