import React, { useRef, useState } from "react";
import {
  InfiniteScrollProps,
  InfiniteScrollState,
} from "./infiniteScroll.types";
import { debounce } from "@/common/utils";

const InfiniteScroll = ({
  handlePageChange,
  onReversePageChange,
  nextPage,
  children,
  customClass,
  reverseScroll,
}: InfiniteScrollProps) => {
  const [state, updateState] = useState<InfiniteScrollState>({
    loading: false,
  });

  const [containerHeight, setContainerHeight] = useState<number>(0);

  const handleDebounce = () => {
    const scroller = scrollRef?.current;
    const atBottom =
      !!scroller &&
      Math.round(scroller?.scrollHeight - scroller?.scrollTop) ===
        scroller?.clientHeight;
    if (scroller && atBottom && nextPage) {
      updateState((state) => ({ ...state, loading: true }));
      handlePageChange && handlePageChange();
    } else {
      updateState((state) => ({ ...state, loading: false }));
    }
  };

  const handleReverseScroll = () => {
    if (scrollRef.current && scrollRef.current.scrollTop <= 0 && nextPage) {
      onReversePageChange &&
        onReversePageChange(
          scrollRef.current.scrollHeight - containerHeight,
          scrollRef
        );
      setContainerHeight(scrollRef.current.scrollHeight);
    }
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = reverseScroll
    ? debounce(handleReverseScroll)
    : debounce(handleDebounce);

  return (
    <div ref={scrollRef} onScroll={handleScroll} className={customClass}>
      {children}
    </div>
  );
};
export default InfiniteScroll;
