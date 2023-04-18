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

  const handleDebounce = () => {
    const scroller = scrollRef?.current;
    if (scroller && Math.round(scroller?.scrollHeight - scroller?.scrollTop) <=scroller?.clientHeight && nextPage) 
    {
      updateState((state) => ({ ...state, loading: true }));
      handlePageChange();
    } else {
      updateState((state) => ({ ...state, loading: false }));
    }
  };
  const handleScroll = debounce(handleDebounce);
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={scrollRef} onScroll={handleDebounce} className={customClass}>
      {children}
    </div>
  );
};
export default InfiniteScroll;


