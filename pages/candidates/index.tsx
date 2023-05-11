import { Fragment, useEffect, useState } from "react";
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
  addCandidates,
  getCandidatesData,
  getFilter,
} from "@/services/candidate.service";
import Loader from "@/components/loader";
import EmptyState from "@/components/emptyState";

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
  const [isFilterOpen, setisFilterOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<IFilter[] | false>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [getFilterData, setFilterData] = useState<IFilteredData | false>();
  const [tagList, setTagList] = useState<IList[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [currentAppliedFilter, setCurrentAppliedFilter] = useState<
    ICurrentAppliedField[]
  >([]);
  const [levelsFilter, setLevelsFilter] = useState<string[]>([]);
  const [techStackOptions, setTechStackOptions] = useState<IList[]>();

  const createHeader = () => {
    const keys = !!tabledata && tabledata[0] && Object?.keys(tabledata[0]);
    const tableHeader =
      !!keys &&
      keys.map((key: string, index: number) => {
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
    setisFilterOpen(false);
  };
  const toggleFilter = async () => {
    const { interviewName, ...remainingFilteredArray }: any =
      !!getFilterData && getFilterData;

    const result =
      !!remainingFilteredArray &&
      Object.keys(remainingFilteredArray).map((key, index) => {
        const name = key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .replace(/^\w/, (value) => value.toUpperCase());
        const value = remainingFilteredArray[key].map(
          (item: string, idx: number) => ({
            id: idx + 1,
            label: item,
          })
        );
        return { type: key, name, value };
      });
    setFilter(result);
    setisFilterOpen(!isFilterOpen);
  };

  const applyFilter = async (filters?: any[] = []) => {
    const currentFieldObject: ICurrentAppliedField[] = [
      { interviewName: levelsFilter },
      {
        techStack: filters?.techStack?.map((item: IList) => item?.label) || [],
      },
    ];
    const response = await getCandidatesData({
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
  const handleClickHeaderTag = (filterValue: IList) => {
    if (levelsFilter.includes(filterValue.label)) {
      const filteredData = levelsFilter.filter(
        (level) => level !== filterValue.label
      );
      setLevelsFilter(filteredData);
    } else {
      setLevelsFilter([...levelsFilter, filterValue.label]);
    }
  };
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
    const response = await getCandidatesData({
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
        const response = await getCandidatesData();
        handleNextPage(response.hasNextPage);
        setButtonState({
          ...sortbuttonData,
          Name: { upKeyDisabled: true, downKeyDisabled: false },
        });
        const updatedData = updateTheFetchData(response.candidates);
        setTableData(updatedData);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    const getFilterApi = async () => {
      const getAllfilter = await getFilter();
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
  }, []);

  const handleSubmitButton = async (value: ISubmitButton) => {
    const updatedData = {
      firstName: value.firstName,
      lastName: value.lastName,
      mobileNumber: `91${value.mobileNumber}`,
      techStack: value.techStack.label,
      experienceLevel: +value.experienceLevel,
    };
    const response = await addCandidates(updatedData);
  };

  const handleSearch = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;
      setTableLoading(true);
      const response = await getCandidatesData({
        filterBy: currentAppliedFilter,
        search: searchValue,
      });
      const updatedData = updateTheFetchData(response?.candidates);
      setTableData([...updatedData]);
      setTableLoading(false);
    },
    1000
  );

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : tabledata?.length === 0 ? (
        <EmptyState
          image={Images.candidateEmptyState}
          title={"“Welcome to the candidate management system!"}
          subTitle={
            "To get started, let’s add your first candidate. Click the “+”button to create a new profile."
          }
        />
      ) : (
        <Container>
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
                  <TransitionWrapper open={isFilterOpen}>
                    <Filter
                      filterData={filter}
                      onClick={applyFilter}
                      filterList={{
                        postingTitle: [],
                        candidateStatus: [],
                        techStack: [],
                        interviewName: [],
                      }}
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
          <InfiniteScroll
            nextPage={nextPage}
            handlePageChange={handlePageChange}
            customClass={styles.scroll}
          >
            <TableComponent
              loading={tableLoading}
              data={tabledata}
              columnHeaderTitle={createHeader()}
              sortbuttonData={sortbuttonData}
              fieldforDateFormat={{ time: "Created time" }}
              dataFormatType={DATE_FORMAT.DD_MM_YYYY}
              customStyle={customStyle}
              customRowStyling={styles.customRowStyling}
              buttonState={buttonState}
              handleSortArrowClick={handleSortButtonClick}
              hoverCell={"Tech stack"}
            />
            <ImageComponent
              src={Images.addButton}
              customClass={styles.addButton}
              height={40}
              width={40}
              onClick={() => setAddButtonClicked(true)}
            />
          </InfiniteScroll>
          <Modal
            open={addButtonClicked}
            onClose={() => setAddButtonClicked(false)}
            header="Add Candidate"
            showCloseIcon
          >
            <AddForm
              handleSubmitButton={handleSubmitButton}
              techStackOptions={techStackOptions}
            />
          </Modal>
        </Container>
      )}
    </Fragment>
  );
};
export default Candidates;
