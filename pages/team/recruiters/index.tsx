import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sagaActions } from "@/redux/constants";
import { useAppSelector } from "@/redux/hooks";
import Container from "@/components/container";
import ConfirmationModal from "@/components/confirmationModal";
import Images from "@/public/assets/icons";
import styles from "./recruiters.module.scss";
import { debounce } from "@/common/utils";
import {
  resetCurrentRecruiters,
  resetPage,
} from "@/redux/slices/recruiterSlice";
import { RECRUITER_STATUS } from "@/common/types/enums";
import { IRecruitersList } from "@/common/types";
import SharedTable from "@/shared-components/SharedTable";
import { tableHeader } from "@/helpers/recruiters";
import { DEBOUNCE_TIME } from "@/common/constants";

const Recruiters = () => {
  const [recruitersData, setRecruitersData] = useState<IRecruitersList[]>([]);
  const [isModalOpen, toggleModal] = useState<boolean>(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<IRecruitersList>(
    {} as IRecruitersList
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {
    recruitersList,
    hasNextPage,
    currentPage,
    isLoading,
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
    dispatch(resetCurrentRecruiters());
    searchRecruiter(event.target.value);
  };

  const clearSearch = () => {
    searchValue && setSearchValue("");
  };

  const searchRecruiter = debounce((searchKey: string) => {
    dispatch({
      type: sagaActions.SEARCH_RECRUITER,
      payload: { search: searchKey, page: 1, limit: 10 },
    });
  }, DEBOUNCE_TIME.SEARCH_DEBOUNCE);

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
        status: recruiter.isActive
          ? RECRUITER_STATUS.ACTIVE
          : RECRUITER_STATUS.INACTIVE,
      };
    });
    return tableData;
  };

  const onDataChange = (data: IRecruitersList[]) => {
    setRecruitersData(data);
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
    setPageNumber(currentPage);
  }, [currentPage]);

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
      <SharedTable
        searchValue={searchValue}
        tableHeader={tableHeader}
        emptyStateImage={Images.emptyStateImage}
        emptyStateMessage="No Recruiters Found"
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        isLoading={isLoading}
        tableData={recruitersData}
        hasNextPage={hasNextPage}
        handlePageChange={handlePageChange}
        isRecruiter
        handleStatusChange={handleStatusChange}
        onDataChange={onDataChange}
      />

      <ConfirmationModal
        open={isModalOpen}
        title={`Change to ${
          selectedRecruiter?.isActive
            ? RECRUITER_STATUS.INACTIVE
            : RECRUITER_STATUS.ACTIVE
        }`}
        description={`Are you sure you want to change the status to ${
          selectedRecruiter?.isActive
            ? RECRUITER_STATUS.INACTIVE
            : RECRUITER_STATUS.ACTIVE
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
