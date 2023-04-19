import React, {useRef, useState} from "react";
import {
  InfiniteScrollProps,
  InfiniteScrollState,
} from "./infiniteScroll.types";
import { debounce } from "@/common/utils";

const InfiniteScroll = ({
  handlePageChange,
  nextPage,
  children,
  customClass,
}: InfiniteScrollProps) => {
  const [state, updateState] = useState<InfiniteScrollState>({loading: false});
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleDebounce = () => {
    const scroller = scrollRef?.current;
    const atBottom=!!scroller && Math.round(scroller?.scrollHeight - scroller?.scrollTop) <=scroller?.clientHeight
    if (scroller && atBottom && nextPage) 
    {
      updateState((state) => ({ ...state, loading: true }));
      handlePageChange();
    } else {
      updateState((state) => ({ ...state, loading: false }));
    }
  };

  const handleScroll = debounce(handleDebounce);
  return (
    <div ref={scrollRef} onScroll={handleScroll} className={customClass}>
      {children}
    </div>
  );
};
export default InfiniteScroll;




