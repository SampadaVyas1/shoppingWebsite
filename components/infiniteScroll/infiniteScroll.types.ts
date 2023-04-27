import { PropsWithChildren } from "react";

export interface InfiniteScrollState {
  loading: boolean;
  scrollerRef?: React.RefObject<HTMLDivElement>;
  handleScroll?: () => void;
}
export interface InfiniteScrollProps extends PropsWithChildren {
  handlePageChange: () => void;
  nextPage: boolean;
  customClass?: string;
}
