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
import { SORT_TYPE } from "@/common/constants";
import { IButtonState } from "@/pages/candidates/candidates.types";
import { debounce, sortDataByField } from "@/common/utils";
import { resetPage } from "@/redux/slices/techStackSlice";

const tableHeader = [
  {
    id: 1,
    title: "Name",
    sort: true,
    dataIndex: "name",
    key: "name",
  },
  {
    id: 2,
    title: "Total Candidates",
    sort: false,
    dataIndex: "totalCandidates",
    key: "totalCandidates",
  },
  {
    id: 3,
    title: "Active Candidates",
    sort: false,
    dataIndex: "activeCandidates",
    key: "activeCandidates",
  },
];

const sortbuttonData: any = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
};

const TechStacks = () => {
  const customStyle = {
    table: ({ ...props }) => {
      return <table {...props} className={styles.table} />;
    },
    header: {
      row: (props: React.HTMLAttributes<HTMLTableRowElement>[]) => (
        <tr {...props} className={styles.customHeaderStyle} />
      ),
    },
  };

  const [techStackData, setTechStackData] = useState<ITechStackList[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [buttonState, setButtonState] = useState<IButtonState>(sortbuttonData);

  const {
    techStackList,
    hasNextPage,
    currentPage,
    isLoading,
    isError,
    totalPages,
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
    searchTechStack(event.target.value);
  };

  const clearSearch = () => {
    searchValue && setSearchValue("");
    setTechStackData(techStackList);
  };

  const toggleSort = (
    field: string,
    data: any[],
    upKeyDisabled: boolean,
    downKeyDisabled: boolean
  ) => {
    setButtonState((buttonState: IButtonState) => ({
      ...buttonState,
      [field]: {
        ...buttonState[field],
        upKeyDisabled: upKeyDisabled,
        downKeyDisabled: downKeyDisabled,
      },
    }));
    const newData = !!data && sortDataByField(data, field, upKeyDisabled);
    setTechStackData(newData);
  };

  const handleSortButtonClick = (
    field: string,
    sortType: string,
    data: ITechStackList[]
  ) => {
    sortType === SORT_TYPE.ASCENDING
      ? !buttonState[field]?.upKeyDisabled &&
        toggleSort(field, data, true, false)
      : sortType === SORT_TYPE.DESCENDING
      ? !buttonState[field]?.downKeyDisabled &&
        toggleSort(field, data, false, true)
      : null;
  };

  const searchTechStack = debounce((searchKey: string) => {
    dispatch({
      type: sagaActions.SEARCH_TECH_STACK,
      payload: { search: searchKey, page: 1, limit: 10 },
    });
  }, 1000);

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
      <InputBox
        endIcon={searchValue ? Images.close : Images.search}
        onEndIconClick={clearSearch}
        value={searchValue}
        placeholder="Search..."
        onChange={handleSearch}
        customClass={styles.searchBox}
      />
      {!!techStackData.length || searchValue || isLoading ? (
        <React.Fragment>
          <InfiniteScroll
            nextPage={hasNextPage}
            handlePageChange={handlePageChange}
            customClass={styles.scroll}
          >
            {isLoading && (
              <div className={styles.loadingWrapper}>
                <Image
                  src={loaderSpinner}
                  className={styles.spinner}
                  alt="loading"
                />
              </div>
            )}

            <TableComponent
              data={techStackData}
              columnHeaderTitle={tableHeader}
              sortbuttonData={sortbuttonData}
              handleSortArrowClick={handleSortButtonClick}
              customStyle={customStyle}
              customRowStyling={styles.customRowStyling}
            />
          </InfiniteScroll>
        </React.Fragment>
      ) : (
        !isLoading && (
          <EmptyState
            image={Images.techStackEmpty}
            title={`"Oops, it looks like tech stack details haven't been added yet!`}
          />
        )
      )}
    </Container>
  );
};

export default TechStacks;
