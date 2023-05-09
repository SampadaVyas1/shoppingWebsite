import Container from "@/components/container";
import Search from "@/components/searchBar";
import InfiniteScroll from "@/components/infiniteScroll";
import { TableComponent } from "@/components/table";
import techStacks from "./mockData.json";
import styles from "./techStacks.module.scss";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import InputBox from "@/components/inputBox";
import Images from "@/public/assets/icons";
import { debounce, sortDataByField } from "@/common/utils";
import EmptyState from "@/components/emptyState";
import { useDispatch } from "react-redux";
import { sagaActions } from "@/redux/constants";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/components/loader";
import NoTechStack from "../../../public/assets/icons/techStackEmpty.svg";
import { ITechStackList } from "@/common/types";
import { SORT_TYPE } from "@/common/constants";
import { IButtonState } from "@/pages/candidates/candidates.types";
import Typography from "@/components/typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";

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
  const [techStackData, setTechStackData] = useState<ITechStackList[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [buttonState, setButtonState] = useState<IButtonState>(sortbuttonData);

  const dispatch = useDispatch();

  const {
    techStackList,
    hasNextPage,
    currentPage,
    isLoading,
    isError,
    totalPages,
    currentTechStacks,
  } = useAppSelector((state) => state.techStack);

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

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value);
    searchTechStack(event.target.value);
  };

  const handlePageChange = () => {
    setPageNumber(pageNumber + 1);
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

  const searchTechStack = (searchKey: string) => {
    dispatch({
      type: sagaActions.SEARCH_TECH_STACK,
      payload: { search: searchKey, page: 1, limit: 10 },
    });
  };

  const getAllTechStackData = useCallback(() => {
    dispatch({
      type: sagaActions.GET_TECH_STACKS,
      payload: { page: pageNumber, limit: 10 },
    });
  }, [dispatch, pageNumber]);

  useEffect(() => {
    setTechStackData(techStackList);
  }, [techStackList]);

  useEffect(() => {
    getAllTechStackData();
  }, [getAllTechStackData]);

  useEffect(() => {
    setTechStackData(currentTechStacks);
  }, [currentTechStacks]);

  return (
    <Container customClass={styles.techStacks}>
      {isError && (
        <Typography
          variant={TYPOGRAPHY_VARIANT.ERROR}
          customStyle={styles.errorMessage}
        >
          Oops!!! Something went wrong......
        </Typography>
      )}
      <InputBox
        endIcon={searchValue ? Images.close : Images.search}
        onEndIconClick={clearSearch}
        value={searchValue}
        onChange={handleSearch}
        customClass={styles.searchBox}
      />
      {!!techStackData.length || searchValue || isLoading ? (
        <React.Fragment>
          <InfiniteScroll
            nextPage={pageNumber < totalPages}
            handlePageChange={handlePageChange}
            customClass={styles.scroll}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <TableComponent
                data={techStackData}
                columnHeaderTitle={tableHeader}
                sortbuttonData={sortbuttonData}
                handleSortArrowClick={handleSortButtonClick}
                customStyle={customStyle}
                customRowStyling={styles.customRowStyling}
              />
            )}
          </InfiniteScroll>
        </React.Fragment>
      ) : (
        !isLoading && (
          <EmptyState
            image={NoTechStack}
            title={`"Oops, it looks like tech stack details haven't been added yet!`}
          />
        )
      )}
    </Container>
  );
};

export default TechStacks;
