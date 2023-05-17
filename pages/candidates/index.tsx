import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import { Popover } from "react-tiny-popover";
import {
  IButtonState,
  ICurrentAppliedField,
  IData,
  IFilter,
  IFilteredData,
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
import moment from "moment";

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
      colspan: "createdAt",
      colspanValue: TABLE_CONSTANTS.TIME,
    },
  ];

  const [tabledata, setTableData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState<IButtonState>(sortbuttonData);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [nextPage, handleNextPage] = useState<boolean>(false);
  const [addButtonClicked, setAddButtonClicked] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<{
    isFilterOpen: boolean;
    filter: IFilter[] | false;
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
  const [getFilterData, setFilterData] = useState<IFilteredData | false>();
  const [currentAppliedFilter, setCurrentAppliedFilter] = useState<
    ICurrentAppliedField[]
  >([]);
  const [levelsFilter, setLevelsFilter] = useState<string[]>([]);
  const [techStackOptions, setTechStackOptions] = useState<IList[]>();
  const [tagList, setTagList] = useState<IList[]>([]);
  const [totalCandidateCount, setTotalCandidateCount] = useState();

  const filterList = {
    postingTitle: [],
    candidateStatus: [],
    techStack: [],
    interviewName: [],
  };
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
      Object.entries(getFilterData || {}).filter(
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
        return { type: key, name, value };
      });
    setFilterState((prev) => ({
      ...prev,
      filter: filteredArray,
      isFilterOpen: !prev.isFilterOpen,
    }));
  };

  const applyFilter = async (filters: any = []) => {
    const currentFieldObject: ICurrentAppliedField[] = [
      { interviewName: levelsFilter },
      {
        techStack: filters?.techStack?.map((item: IList) => item?.label) || [],
      },
    ];
    const response = await getCandidatesService({
      filterBy: currentFieldObject,
    });
    setCurrentAppliedFilter(currentFieldObject);
    handleNextPage(response?.hasNextPage);
    const updatedData = updateTheFetchData(
      response?.candidates?.length !== 0 && response?.candidates
    );
    setPageNumber(response?.currentPage);
    setTableData(updatedData);
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
          time: moment(item.createdAt).format("hh:mm a"),
          name: item.firstName + " " + item.lastName,
          recruiter: item.recruiterName + " " + item.recruiterlastName,
        };
      });
    return updatedData;
  };

  const handlePageChange = async () => {
    const response = await getCandidatesService({
      filterBy: currentAppliedFilter,
      limit: 10,
      page: pageNumber + 1,
    });
    handleNextPage(response?.hasNextPage);
    const updatedData = updateTheFetchData(response?.candidates);
    setTableData([...tabledata, ...updatedData]);
    setPageNumber(pageNumber + 1);
    setButtonState(sortbuttonData);
  };

  useEffect(() => {
    applyFilter();
  }, [levelsFilter]);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const response = await getCandidatesService();
        setTotalCandidateCount(response.totalCandidates);
        handleNextPage(response.hasNextPage);
        setButtonState({
          ...sortbuttonData,
          Name: { upKeyDisabled: true, downKeyDisabled: false },
        });
        const updatedData = updateTheFetchData(response.candidates);
        setTableData(updatedData);
        setLoading((prev) => ({ ...prev, loading: false }));
      } catch (error) {
        setLoading((prev) => ({ ...prev, loading: true }));
      }
    };
    const getFilterApi = async () => {
      const getAllfilter = await getFilterService();
      setFilterData(getAllfilter);
      setTechStackOptions(
        getAllfilter?.techStack &&
          getAllfilter?.techStack.map((item: string, index: number) => ({
            id: index,
            label: item,
          }))
      );
      setTagList(
        getAllfilter.interviewName &&
          getAllfilter.interviewName.map((item: string, index: number) => ({
            id: index,
            label: item,
          }))
      );
    };
    getCandidates();
    getFilterApi();
  }, [addButtonClicked]);

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
      setLoading((prev) => ({ ...prev, tableLoading: true }));
      const response = await getCandidatesService({
        filterBy: currentAppliedFilter,
        search: searchValue,
      });
      const updatedData = updateTheFetchData(response?.candidates);
      setTableData([...updatedData]);
      setLoading((prev) => ({ ...prev, tableLoading: false }));
      handleNextPage(response?.hasNextPage);
      setPageNumber(response.currentPage);
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

  const [selectedData, setSelectedData] = useState<number[]>([]);

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
                endIcon={Images.search}
                placeholder="Search..."
                onEndIconClick={Images.searchIcon}
                className={styles.search}
                onChange={handleSearch}
              />
            </div>
            <div className={styles.tagList}>
              {!!tagList &&
                tagList.map((filterValue: { id: number; label: string }) => (
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
              nextPage={nextPage}
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
