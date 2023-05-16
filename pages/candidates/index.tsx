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
import { DATE_FORMAT, SORT_TYPE } from "@/common/constants";
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

const Candidates = () => {
  const sortbuttonData: IButtonState = {
    Name: { upKeyDisabled: false, downKeyDisabled: false },
    "Created time": { upKeyDisabled: false, downKeyDisabled: false },
  };

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

  const {
    candidatesList,
    hasNextPage,
    currentPage,
    isLoading,
    isError,
    totalPages,
    currentCandidates,
  } = useAppSelector((state) => state.candidate);


  const createHeader = () => {
    const tableHeaderkeys =
      !!tabledata && tabledata[0] && Object?.keys(tabledata[0]);
    const tableHeader =
      !!tableHeaderkeys &&
      tableHeaderkeys.map((key: string, index: number) => {
        let sort = key === "Name" || key === "Created time" ? true : false;
        return {
          id: index + 1,
          title: key,
          sort: sort,
          dataIndex: key,
          key: key,
        };
      });
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

  const applyFilter = async (filters: IFilteredData[] = []) => {
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
          Name: item.firstName + " " + item.lastName,
          "Mobile Number": item.mobileNumber,
          "Experience level": item.experienceLevel,
          "Tech stack": item.techStack,
          "Created time": item.createdAt,
          Recruiter: item.recruiterName + " " + item.recruiterlastName,
          "Interview Level": item.interviewName,
          Status: item.interviewStatus,
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

  return (
    <Fragment>
      {loadingState.loading ? (
        <Loader />
      ) : tabledata?.length === 0 && totalCandidateCount === 0 ? (
        <Fragment>
          <EmptyState
            image={Images.candidateEmptyState}
            title={"“Welcome to the candidate management system!"}
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
            <Typography
              variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}
              customStyle={styles.totalCount}
            >
              Candidates({totalCandidateCount})
            </Typography>
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
              customClass={styles.scroll}
            >
              <TableComponent
                loading={loadingState.tableLoading}
                data={tabledata}
                columnHeaderTitle={createHeader()}
                fieldforDateFormat={{ time: "Created time" }}
                dataFormatType={DATE_FORMAT.DD_MM_YYYY}
                customStyle={customStyle}
                customRowStyling={styles.customRowStyling}
                buttonState={buttonState}
                handleSortArrowClick={handleSortButtonClick}
              />
              <ImageComponent
                src={Images.addButton}
                customClass={styles.addButton}
                height={40}
                width={40}
                onClick={() => setAddButtonClicked(true)}
              />
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
