import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import { Popover } from "react-tiny-popover";
import {
  IButtonState,
  ICurrentAppliedField,
  IData,
  IFilter,
  IList,
  ISubmitButton,
} from "./candidates.types";
import Container from "@/components/container";
import Images from "@/public/assets/icons";
import ImageComponent from "../../components/imageComponent/index";
import Tag from "@/components/tag/tag";
import AddForm from "@/components/addForm";
import Modal from "@/components/modal";
import Filter from "@/components/filterComponent";
import { TOOLTIP_POSITION, TYPOGRAPHY_VARIANT } from "@/common/enums";
import TransitionWrapper from "@/components/transitionWrapper";
import Image from "next/image";
import InputBox from "@/components/inputBox";
import { DATE_FORMAT, SORT_TYPE, TABLE_CONSTANTS } from "@/common/constants";
import { TableComponent } from "../../components/table/index";
import { debounce, sortDataByField } from "@/common/utils";
import {
  addCandidatesService,
  getCandidatesService,
  getFilterService,
} from "@/services/candidate.service";
import Loader from "@/components/loader";
import EmptyState from "@/components/emptyState";
import Typography from "@/components/typography";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { sagaActions } from "@/redux/actions";
import { resetCandidatesData, resetPage } from "@/redux/slices/candidateSlice";

const tableHeaderData = [
  {
    id: 0,
    title: "checkbox",
    sort: false,
    dataIndex: "checkbox",
    key: "checkbox",
  },
  {
    id: 1,
    title: "Name",
    sort: true,
    dataIndex: "name",
    key: "name",
  },
  {
    id: 2,
    title: "Mobile number",
    sort: false,
    dataIndex: "mobileNumber",
    key: "mobileNumber",
  },
  {
    id: 3,
    title: "Experience Level",
    sort: false,
    dataIndex: "experienceLevel",
    key: "activeCandidates",
  },
  {
    id: 4,
    title: "Tech stack",
    sort: false,
    dataIndex: "techStack",
    key: "techStack",
  },
  {
    id: 5,
    title: "Created time",
    sort: true,
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    id: 6,
    title: "Recruiter",
    sort: false,
    dataIndex: "recruiter",
    key: "recruiter",
  },
  {
    id: 7,
    title: "Status",
    sort: false,
    dataIndex: "interviewStatus",
    key: "interviewStatus",
  },
  {
    id: 7,
    title: "Interview Level",
    sort: false,
    dataIndex: "interviewName",
    key: "interviewName",
  },
];

const Candidates = ({ customScrollStyle, hasOutsideData, onSelect }: any) => {
  const sortbuttonData: IButtonState = {
    Name: { upKeyDisabled: false, downKeyDisabled: false },
    "Created time": { upKeyDisabled: false, downKeyDisabled: false },
  };

  const additionalValue: any[] = [
    {
      colspan: TABLE_CONSTANTS.NAME,
      colspanValue: TABLE_CONSTANTS.DESIGNATION,
      customStyle: styles.designation,
    },
    {
      colspan: TABLE_CONSTANTS.CREATEDTIME,
      colspanValue: TABLE_CONSTANTS.TIME,
    },
  ];
  const [searchValue, setSearchValue] = useState<string>("");
  const [tabledata, setTableData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState<IButtonState>(sortbuttonData);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [addButtonClicked, setAddButtonClicked] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<{
    isFilterOpen: boolean;
    filter: IFilter[];
  }>({
    isFilterOpen: false,
    filter: [],
  });
  const [loadingState, setLoading] = useState<{
    loading: boolean;
    tableLoading: boolean;
  }>({
    loading: true,
    tableLoading: false,
  });

  const [levelsFilter, setLevelsFilter] = useState<string[]>([]);
  const [techStackOptions, setTechStackOptions] = useState<IList[]>();
  const [totalCandidateCount, setTotalCandidateCount] = useState();
  const [selectedData, setSelectedData] = useState<number[]>([]);

  const filterList = {
    postingTitle: [],
    candidateStatus: [],
    techStack: [],
    interviewName: [],
  };

  const [appliedFilter, setAppliedFilter] = useState<ICurrentAppliedField[]>(
    []
  );

  const {
    candidatesList,
    filterData,
    hasNextPage,
    currentPage,
    isLoading,
    isError,
    totalPages,
    currentCandidates,
  } = useAppSelector((state) => state.candidate);
  const dispatch = useDispatch<any>();

  const createHeader = () => {
    const tableHeader = !hasOutsideData
      ? tableHeaderData.filter((header) => header.dataIndex !== "checkbox")
      : tableHeaderData;
    return tableHeader;
  };

  const closeFilter = () => {
    setFilterState((prev) => ({ ...prev, isFilterOpen: false }));
  };

  const toggleFilter = async () => {
    const remainingFilteredArray = Object.fromEntries(
      Object.entries(filterData || {}).filter(
        ([key]) => key !== "interviewName"
      )
    );
    const filteredArray =
      !!remainingFilteredArray &&
      Object.keys(remainingFilteredArray).map((key, index) => {
        const name = key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .replace(/^\w/, (value) => value.toUpperCase());
        const value =
          !!remainingFilteredArray &&
          remainingFilteredArray[key]?.map((item: string, idx: number) => ({
            id: idx + 1,
            label: item,
          }));
        console.log(value);
        return { type: key, name, value };
      });
    setFilterState((prev) => ({
      ...prev,
      filter: filteredArray,
      isFilterOpen: !prev.isFilterOpen,
    }));
  };

  const applyFilter = async (filters: any = []) => {
    dispatch(resetCandidatesData());
    const currentFieldObject: ICurrentAppliedField[] = [
      {
        interviewName: levelsFilter,
        search: filters?.search,
        techStack: filters?.techStack?.map((item: IList) => item?.label) || [],
      },
    ];
    setAppliedFilter(currentFieldObject);
    dispatch({
      type: sagaActions.DATA_AFTER_FILTERING,
      payload: { filterBy: currentFieldObject, page: 1, limit: 10 },
    });
    setLoading((prev) => ({ ...prev, tableLoading: false }));
  };

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
  const handleClickHeaderTag = useCallback((filterValue: IList) => {
    setLevelsFilter((prevFilter) => {
      if (prevFilter.includes(filterValue.label)) {
        return prevFilter.filter((level) => level !== filterValue.label);
      } else {
        return [...prevFilter, filterValue.label];
      }
    });
  }, []);

  const toggleSortButton = (
    field: string,
    data: IData[],
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
    return newData;
  };

  const handleSortButtonClick = (
    field: string,
    sortType: string,
    data: IData[]
  ) => {
    sortType === SORT_TYPE.ASCENDING
      ? !buttonState[field]?.upKeyDisabled &&
        setTableData(toggleSortButton(field, data, true, false))
      : sortType === SORT_TYPE.DESCENDING
      ? !buttonState[field]?.downKeyDisabled &&
        setTableData(toggleSortButton(field, data, false, true))
      : null;
  };
  const updateTheFetchData = (getdata: IData[]) => {
    const updatedData =
      !!getdata &&
      getdata.map((item: IData) => {
        return {
          ...item,
          checkbox: "true",
          name: item.firstName + " " + item.lastName,
          recruiter: item.recruiterName + " " + item.recruiterlastName,
        };
      });
    return updatedData;
  };

  const handlePageChange = async () => {
    !appliedFilter?.length && !searchValue.length
      ? dispatch({
          type: sagaActions.GET_ALL_CANDIDATES,
          payload: { page: currentPage + 1, limit: 10 },
        })
      : dispatch({
          type: sagaActions.DATA_AFTER_FILTERING,
          payload: {
            filterBy: appliedFilter,
            page: currentPage + 1,
            limit: 10,
          },
        });
    setPageNumber(pageNumber + 1);
  };

  const getAllCandidateData = useCallback(() => {
    dispatch({
      type: sagaActions.GET_ALL_CANDIDATES,
      payload: { page: pageNumber, limit: 10 },
    });
  }, []);

  const getAllFilterData = useCallback(() => {
    dispatch({
      type: sagaActions.GET_CANDIDATE_FILTER,
    });
  }, []);

  const handleAddCandidateSubmitButton = async (value: ISubmitButton) => {
    const updatedData = {
      firstName: value.firstName,
      lastName: value.lastName,
      mobileNumber: `91${value.mobileNumber}`,
      techStack: value.techStack.label,
      experienceLevel: +value.experienceLevel,
    };
    const response = await addCandidatesService(updatedData);
    setAddButtonClicked(false);
    setPageNumber(1);
  };

  const handleSearch = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value.trimStart().trimEnd();
      setSearchValue(searchValue);
      setLoading((prev) => ({ ...prev, tableLoading: true }));
      applyFilter({ search: searchValue });
    },
    1000
  );

  const onMasterCheck = (value: number[]) => {
    setSelectedData([...value]);
    const filteredData = tabledata?.filter((data) => value?.includes(data.id));
    onSelect && onSelect(filteredData);
  };

  const onRowSelect = (
    row: number,
    selectedRow: number[],
    onSelectedRowChange: (value: number[]) => void
  ) => {
    setSelectedData([...selectedRow]);
    const filteredData = tabledata?.filter((data) =>
      selectedRow?.includes(data.id)
    );
    onSelect && onSelect(filteredData);
  };

  const clearSearch = () => {
    searchValue && setSearchValue("");
  };

  useEffect(() => {
    setTableData(updateTheFetchData(currentCandidates));
  }, [currentCandidates]);

  useEffect(() => {
    getAllCandidateData();
    getAllFilterData();
  }, []);

  useEffect(() => {
    setTechStackOptions(
      filterData?.techStack &&
        filterData?.techStack.map((item: string, index: number) => ({
          id: index,
          label: item,
        }))
    );
  }, [filterData]);

  useEffect(() => {
    applyFilter([]);
  }, [levelsFilter]);

  useEffect(() => {
    setPageNumber(pageNumber + 1);
    setTableData(updateTheFetchData(candidatesList));
    setLoading((prevState) => ({ ...prevState, loading: false }));
  }, [candidatesList]);

  useEffect(() => {
    return () => {
      dispatch(resetPage());
    };
  }, [dispatch]);

  return (
    <Fragment>
      {loadingState.loading ? (
        <Loader />
      ) : tabledata?.length === 0 && totalCandidateCount === 0 ? (
        <Fragment>
          <EmptyState
            image={Images.candidateEmptyState}
            title={"Welcome to the candidate management system!"}
            subTitle={
              "To get started, let’s add your first candidate. Click the “+”button to create a new profile."
            }
          />
          <ImageComponent
            src={Images.addButton}
            customClass={styles.addButton}
            height={40}
            width={40}
            onClick={() => setAddButtonClicked(true)}
          />
          <Modal
            open={addButtonClicked}
            onClose={() => setAddButtonClicked(false)}
            header="Add Candidate"
            showCloseIcon
          >
            <AddForm
              handleSubmitButton={handleAddCandidateSubmitButton}
              techStackOptions={techStackOptions}
            />
          </Modal>
        </Fragment>
      ) : (
        <Container>
          <div>
            {!hasOutsideData && (
              <Typography
                variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}
                customStyle={styles.totalCount}
              >
                Candidates({totalCandidateCount})
              </Typography>
            )}
          </div>
          <div className={styles.header}>
            <div className={styles.searchBox}>
              <InputBox
                endIcon={searchValue ? Images.close : Images.search}
                placeholder="Search..."
                onEndIconClick={clearSearch}
                className={styles.search}
                onChange={handleSearch}
              />
            </div>
            <div className={styles.tagList}>
              {!!filterData?.interviewName &&
                filterData?.interviewName
                  .map((item: string, index: number) => ({
                    id: index,
                    label: item,
                  }))
                  .map((filterValue: { id: number; label: string }) => (
                    <Tag
                      tagValue={filterValue}
                      onClick={() => handleClickHeaderTag(filterValue)}
                      active={levelsFilter.includes(filterValue.label)}
                      customClass={styles.default}
                      key={filterValue.id}
                    />
                  ))}
              <Popover
                isOpen={true}
                positions={[TOOLTIP_POSITION.BOTTOM, TOOLTIP_POSITION.RIGHT]}
                reposition={true}
                align="start"
                containerStyle={{ zIndex: "5" }}
                onClickOutside={closeFilter}
                padding={16}
                content={
                  <TransitionWrapper open={filterState.isFilterOpen}>
                    <Filter
                      filterData={filterState.filter}
                      onClick={applyFilter}
                      filterList={filterList}
                      onClose={closeFilter}
                    />
                  </TransitionWrapper>
                }
              >
                <Image
                  src={Images.filterIcon}
                  className={styles.icons}
                  width={24}
                  height={24}
                  alt="filter"
                  onClick={toggleFilter}
                />
              </Popover>
            </div>
          </div>
          {tabledata?.length === 0 ? (
            <div className={styles.noData}>
              <ImageComponent
                src={Images.searchResultNotFound}
                customClass={styles.icon}
              />
              <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}>
                No results.Try other terms
              </Typography>
            </div>
          ) : (
            <InfiniteScroll
              nextPage={hasNextPage}
              handlePageChange={handlePageChange}
              customClass={customScrollStyle || styles.scroll}
            >
              <TableComponent
                loading={loadingState.tableLoading}
                data={tabledata}
                columnHeaderTitle={createHeader()}
                fieldforDateFormat={{ time: "createdAt" }}
                dataFormatType={DATE_FORMAT.DD_MM_YYYY}
                customStyle={customStyle}
                customRowStyling={styles.customRowStyling}
                buttonState={buttonState}
                additionalValue={additionalValue}
                selectedRow={selectedData}
                handleRowEachSelect={onRowSelect}
                handleRowSelect={onMasterCheck}
                handleSortArrowClick={handleSortButtonClick}
              />
              {!hasOutsideData && (
                <ImageComponent
                  src={Images.addButton}
                  customClass={styles.addButton}
                  height={40}
                  width={40}
                  onClick={() => setAddButtonClicked(true)}
                />
              )}
            </InfiniteScroll>
          )}
          <Modal
            open={addButtonClicked}
            onClose={() => setAddButtonClicked(false)}
            header="Add Candidate"
            showCloseIcon
          >
            <AddForm
              handleSubmitButton={handleAddCandidateSubmitButton}
              techStackOptions={techStackOptions}
            />
          </Modal>
        </Container>
      )}
    </Fragment>
  );
};
export default Candidates;
