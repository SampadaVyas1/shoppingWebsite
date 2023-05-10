import { Fragment, useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import { Popover } from "react-tiny-popover";
import { IAdditionalValue, IButtonState, IData } from "./candidates.types";
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
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import EmptyState from "@/components/emptyState";

const sortbuttonData: IButtonState = {
  Name: { upKeyDisabled: false, downKeyDisabled: false },
  "Created time": { upKeyDisabled: false, downKeyDisabled: false },
};
const Candidates = () => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState<IButtonState>(sortbuttonData);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [nextPage, handleNextPage] = useState<boolean>(false);
  const [addButtonClicked, setAddButtonClicked] = useState<boolean>(false);
  const [isFilterOpen, setisFilterOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [getFilterData, setFilterData] = useState<any>();
  const [tagList, setTagList] = useState([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [currentAppliedFilter, setCurrentAppliedFilter] = useState<any[]>([]);
  const [levelsFilter, setLevelsFilter] = useState<any[]>([]);
  const [techStackOptions, setTechStackOptions] = useState<any>();
  const [error, setError] = useState<boolean>(false);

  const keys = !!data && data[0] && Object?.keys(data[0]);
  const tableHeader =
    !!keys &&
    keys.map((key, index) => {
      let sort = key === "Name" || key === "Created time" ? true : false;
      return {
        id: index + 1,
        title: key,
        sort: sort,
        dataIndex: key,
        key: key,
      };
    });
  const closeFilter = () => {
    setisFilterOpen(false);
  };

  const toggleFilter = async () => {
    const { interviewName, ...rest } = !!getFilterData &&  getFilterData;
    const result =
      !!rest &&
      Object.keys(rest).map((key: any, index) => {
        const name = key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .replace(/^\w/, (c: any) => c.toUpperCase());
        const value = rest[key].map((item: any, idx: number) => ({
          id: idx + 1,
          label: item,
        }));
        return { type: key, name, value };
      });
    setFilter(result);
    setisFilterOpen(!isFilterOpen);
  };

  const applyFilter = async (filters?: any = []) => {
    console.log(filters);
    const newObj = [
      { interviewName: levelsFilter },
      { techStack: filters?.techStack?.map((item: any) => item?.label) || [] },
    ];
    const response = await getCandidatesData({
      filterBy: newObj,
    });
    setCurrentAppliedFilter(newObj);
    handleNextPage(response?.data?.data?.hasNextPage);
    const updatedData = updateTheFetchData(
      response?.data?.data?.candidates.length !== 0 &&
        response?.data?.data?.candidates
    );
    setPageNumber(response?.data?.data?.currentPage);
    setData(updatedData);
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

  const handleClickHeaderTag = (filterValue: any) => {
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
    return newData;
  };

  const handleSortButtonClick = (
    field: string,
    sortType: string,
    data: any
  ) => {
    sortType === SORT_TYPE.ASCENDING
      ? !buttonState[field]?.upKeyDisabled &&
        setData(toggleSortButton(field, data, true, false))
      : sortType === SORT_TYPE.DESCENDING
      ? !buttonState[field]?.downKeyDisabled &&
        setData(toggleSortButton(field, data, false, true))
      : null;
  };
  const updateTheFetchData = (getdata: any[]) => {
    const updatedData =
      !!getdata &&
      getdata.map((item: any) => {
        return {
          Name: `${item.firstName} ${item.lastName}`,
          "Mobile Number": `${item.mobileNumber}`,
          "Experience level": item.experienceLevel,
          "Tech stack": item.techStack,
          "Created time": `${item.createdAt}`,
          Recruiter: `${item.recruiterName} ${item.recruiterlastName}`,
          "Interview Level": `${item.interviewName}`,
          Status: `${item.interviewStatus}`,
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
    handleNextPage(response?.data?.data?.hasNextPage);
    const updatedData = updateTheFetchData(response?.data?.data?.candidates);
    setData([...data, ...updatedData]);
    setPageNumber(pageNumber + 1);
    setButtonState(sortbuttonData);
  };

  const handleRowSelect = (value: number[]) => {
    setSelectedRow(value);
  };

  const handleRowEachSelect = (
    row: number,
    selectedRow: number[],
    onSelectedRowChange: (value: number[]) => void
  ) => {
    const filteredRow = selectedRow?.filter((singleRow: number) => {
      return singleRow !== row;
    });
    if (onSelectedRowChange) {
      if (filteredRow?.length !== selectedRow?.length) {
        onSelectedRowChange([...filteredRow]);
      } else {
        const selectedrow = [...selectedRow];
        selectedrow.push(row);
        onSelectedRowChange([...selectedrow]);
      }
    }
  };
  useEffect(() => {
    applyFilter();
  }, [levelsFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCandidatesData();
        handleNextPage(response?.data?.data?.hasNextPage);
        return response?.data?.data?.candidates;
      } catch (error) {
        setLoading(true);
        //  error;
      }
    };
    const getCandidates = async () => {
      try {
        const getdata = await fetchData();

        setButtonState({
          ...sortbuttonData,
          Name: { upKeyDisabled: true, downKeyDisabled: false },
        });
        const updatedData = updateTheFetchData(getdata);
        setData(updatedData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(true);
      }
    };
    const getFilterApi = async () => {
      const getAllfilter = await getFilter();
      setFilterData(getAllfilter?.data?.data);
      console.log(getAllfilter?.data?.data);
      setTechStackOptions(
        getAllfilter?.data?.data?.techStack.map((item: any, index: number) => ({
          id: index,
          label: item,
        }))
      );
      setTagList(
        getAllfilter?.data?.data.interviewName.map(
          (item: any, index: number) => ({ id: index, label: item })
        )
      );
    };
    getCandidates();
    getFilterApi();
  }, []);

  const handleSubmitButton = async (value: any) => {
    const updatedData = {
      firstName: value.firstName,
      lastName: value.lastName,
      mobileNumber: `91${value.mobileNumber}`,
      techStack: value.techStack.label,
      experienceLevel: +value.experienceLevel,
    };
    const response = await addCandidates(updatedData);
  };

  const handleSearch = debounce(async (event: any) => {
    const searchValue = event.target.value;
    setTableLoading(true);
    const response = await getCandidatesData({
      filterBy: currentAppliedFilter,
      search: searchValue,
    });
    const updatedData = updateTheFetchData(response?.data?.data?.candidates);
    setData([...updatedData]);
    setTableLoading(false);
  }, 1000);

  return (
    <Fragment>
      {error ? (
        <div className={styles.error}>
        {/* <Typography variant={TYPOGRAPHY_VARIANT.HEADER_LARGE}  customStyle={styles.error404}>Error 404</Typography> */}
        <EmptyState image={Images.Error404} title={"Oops! No Internet Connection"} 
        subTitle={"Please check your internet connection and try again."}
        heading="Error 404"/>
        
        </div>
        
      ) : loading ? (
        <Loader />
      ) : data.length === 0 ? (
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
                tagList.map((filterValue: any) => (
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
                      onclose={closeFilter}
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
              data={data}
              columnHeaderTitle={tableHeader}
              sortbuttonData={sortbuttonData}
              fieldforDateFormat={{ time: "Created time" }}
              dataFormatType={DATE_FORMAT.DD_MM_YYYY}
              customStyle={customStyle}
              customRowStyling={styles.customRowStyling}
              buttonState={buttonState}
              handleSortArrowClick={handleSortButtonClick}
              selectedRow={selectedRow}
              handleRowSelect={handleRowSelect}
              handleRowEachSelect={handleRowEachSelect}
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
