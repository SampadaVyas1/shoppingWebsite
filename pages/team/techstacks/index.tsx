import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { sagaActions } from "@/redux/constants";
import { useAppSelector } from "@/redux/hooks";
import Container from "@/components/container";
import InfiniteScroll from "@/components/infiniteScroll";
import { TableComponent } from "@/components/table";
import InputBox from "@/components/inputBox";
import Images from "@/public/assets/icons";
import EmptyState from "@/components/emptyState";
import styles from "./techStacks.module.scss";
import loaderSpinner from "../../../public/assets/icons/loader.svg";
import { ITechStackList } from "@/common/types";
import { DEBOUNCE_TIME, SORT_TYPE } from "@/common/constants";
import { IButtonState } from "@/common/types/candidates.types";
import { debounce, sortDataByField } from "@/common/utils";
import {
  resetCurrentTechStacks,
  resetPage,
} from "@/redux/slices/techStackSlice";
import { tableHeader } from "@/helpers/techStacks";
import SharedTable from "@/shared-components/SharedTable";

const TechStacks = () => {
  const [techStackData, setTechStackData] = useState<ITechStackList[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {
    techStackList,
    hasNextPage,
    currentPage,
    isLoading,
    currentTechStacks,
  } = useAppSelector((state) => state.techStack);

  const dispatch = useDispatch();

  const handlePageChange = () => {
    searchValue &&
      dispatch({
        type: sagaActions.SEARCH_RECRUITER,
        payload: { search: searchValue, page: currentPage + 1, limit: 10 },
      });
    setPageNumber(pageNumber + 1);
  };

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value);
    dispatch(resetCurrentTechStacks());
    searchTechStack(event.target.value);
  };

  const clearSearch = () => {
    searchValue && setSearchValue("");
  };

  const onDataChange = (data: ITechStackList[]) => {
    setTechStackData(data);
  };

  const searchTechStack = debounce((searchKey: string) => {
    dispatch({
      type: sagaActions.SEARCH_TECH_STACK,
      payload: { search: searchKey, page: 1, limit: 10 },
    });
  }, DEBOUNCE_TIME.SEARCH_DEBOUNCE);

  const getAllTechStackData = useCallback(() => {
    !searchValue &&
      dispatch({
        type: sagaActions.GET_TECH_STACKS,
        payload: { page: pageNumber, limit: 10 },
      });
  }, [dispatch, pageNumber, searchValue]);

  useEffect(() => {
    setTechStackData(techStackList);
  }, [techStackList]);

  useEffect(() => {
    getAllTechStackData();
  }, [getAllTechStackData]);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  useEffect(() => {
    return () => {
      dispatch(resetPage());
    };
  }, [dispatch]);

  useEffect(() => {
    setTechStackData(currentTechStacks);
  }, [currentTechStacks]);

  return (
    <Container customClass={styles.techStacks}>
      <SharedTable
        searchValue={searchValue}
        tableHeader={tableHeader}
        emptyStateImage={Images.techStackEmpty}
        emptyStateMessage="No Tech Stacks Found"
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        isLoading={isLoading}
        tableData={techStackData}
        hasNextPage={hasNextPage}
        handlePageChange={handlePageChange}
        onDataChange={onDataChange}
      />
    </Container>
  );
};

export default TechStacks;
