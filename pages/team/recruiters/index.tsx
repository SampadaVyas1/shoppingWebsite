import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { sagaActions } from "@/redux/constants";
import { useAppSelector } from "@/redux/hooks";
import Container from "@/components/container";
import InfiniteScroll from "@/components/infiniteScroll";
import { TableComponent } from "@/components/table";
import ConfirmationModal from "@/components/confirmationModal";
import InputBox from "@/components/inputBox";
import Images from "@/public/assets/icons";
import EmptyState from "@/components/emptyState";
import styles from "./recruiters.module.scss";
import loaderSpinner from "../../../public/assets/icons/loader.svg";
import { IRecruitersList, ITechStackList } from "@/common/types";
import { SORT_TYPE } from "@/common/constants";
import {
  IAdditionalValue,
  IButtonState,
  IShowToggle,
} from "@/pages/candidates/candidates.types";
import { debounce, sortDataByField } from "@/common/utils";
import { resetPage } from "@/redux/slices/recruiterSlice";

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
    title: "Mobile Number",
    sort: false,
    dataIndex: "mobileNumber",
    key: "mobileNumber",
  },
  {
    id: 3,
    title: "Email Id",
    sort: false,
    dataIndex: "email",
    key: "emailId",
  },
  {
    id: 4,
    title: "Candidates",
    sort: true,
    dataIndex: "candidates",
    key: "candidates",
  },
  {
    id: 5,
    title: "Status",
    sort: false,
    dataIndex: "status",
    key: "status",
  },
];

const sortbuttonData: any = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  candidates: { upKeyDisabled: false, downKeyDisabled: false },
};

const Recruiters = () => {
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

  const additionalValue: IAdditionalValue[] = [
    {
      colspan: "name",
      colspanValue: "designation",
      customStyle: styles.designation,
    },
  ];

  const showToggle: IShowToggle = {
    colspan: "status",
    customStyle: styles.designation,
  };
  const [recruitersData, setRecruitersData] = useState<IRecruitersList[]>([]);
  const [isModalOpen, toggleModal] = useState<boolean>(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<IRecruitersList>(
    {} as IRecruitersList
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [buttonState, setButtonState] = useState<IButtonState>(sortbuttonData);

  const {
    recruitersList,
    hasNextPage,
    currentPage,
    isLoading,
    isError,
    totalPages,
    currentRecruiters,
  } = useAppSelector((state) => state.recruiters);

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
    searchRecruiter(event.target.value);
  };

  const clearSearch = () => {
    searchValue && setSearchValue("");
    setRecruitersData(updatedData(recruitersList));
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
    // dispatch({
    //   type: sagaActions.GET_RECRUITERS,
    //   payload: { page: pageNumber, search: searchValue,sortBy:[] limit: 10 },
    // });
    const newData = !!data && sortDataByField(data, field, upKeyDisabled);
    setRecruitersData(newData);
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

  const searchRecruiter = debounce((searchKey: string) => {
    dispatch({
      type: sagaActions.SEARCH_RECRUITER,
      payload: { search: searchKey, page: 1, limit: 10 },
    });
  }, 1000);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  const getAllRecruitersData = useCallback(() => {
    !searchValue &&
      dispatch({
        type: sagaActions.GET_RECRUITERS,
        payload: { page: pageNumber, limit: 10 },
      });
  }, [dispatch, pageNumber, searchValue]);

  const updatedData = (data: IRecruitersList[]) => {
    const tableData = data.map((recruiter) => {
      return {
        ...recruiter,
        name: `${recruiter.firstName} ${recruiter.lastName}`,
        status: recruiter.isActive ? "Active" : "Inactive",
      };
    });
    return tableData;
  };

  const changeStatus = () => {
    dispatch({
      type: sagaActions.UPDATE_RECRUITER,
      payload: {
        employeeId: selectedRecruiter.employeeId,
        isActive: !selectedRecruiter.isActive,
        recruiters: recruitersData,
      },
    });

    toggleModal(false);
  };

  const handleStatusChange = (data: IRecruitersList) => {
    toggleModal(!isModalOpen);
    setSelectedRecruiter(data);
  };

  const handleModalClose = () => {
    toggleModal(false);
    setSelectedRecruiter({} as IRecruitersList);
  };

  useEffect(() => {
    setRecruitersData(updatedData(recruitersList));
  }, [recruitersList]);

  useEffect(() => {
    getAllRecruitersData();
  }, [getAllRecruitersData]);

  useEffect(() => {
    return () => {
      dispatch(resetPage());
    };
  }, [dispatch]);

  useEffect(() => {
    setRecruitersData(updatedData(currentRecruiters));
  }, [currentRecruiters]);

  return (
    <Container customClass={styles.recruiters}>
      <InputBox
        endIcon={searchValue ? Images.close : Images.search}
        onEndIconClick={clearSearch}
        value={searchValue}
        placeholder="Search..."
        onChange={handleSearch}
        customClass={styles.searchBox}
      />
      {!!recruitersData.length || searchValue || isLoading ? (
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
              data={recruitersData}
              // isLoading={isLoading}
              additionalValue={additionalValue}
              columnHeaderTitle={tableHeader}
              sortbuttonData={sortbuttonData}
              handleSortArrowClick={handleSortButtonClick}
              onSwitchToggle={handleStatusChange}
              customStyle={customStyle}
              showToggle={showToggle}
              customRowStyling={styles.customRowStyling}
            />
          </InfiniteScroll>
        </React.Fragment>
      ) : (
        !isLoading && (
          <EmptyState
            image={Images.emptyStateImage}
            title={`Nothing to see here`}
          />
        )
      )}

      <ConfirmationModal
        open={isModalOpen}
        title={`Change to ${
          selectedRecruiter?.isActive ? "Inactive" : "Active"
        }`}
        description={`Are you sure you want to change the status to ${
          selectedRecruiter?.isActive ? "inactive" : "active"
        } for ${selectedRecruiter?.name}? `}
        cancelButtonText="Cancel"
        confirmButtonText="Yes"
        onCancelButtonClick={handleModalClose}
        onConfirmButtonClick={changeStatus}
      />
    </Container>
  );
};

export default Recruiters;
