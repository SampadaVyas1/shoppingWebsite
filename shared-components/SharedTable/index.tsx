import React, { useState } from "react";
import Images from "@/build/assets/icons";
import EmptyState from "../../components/emptyState";
import InfiniteScroll from "../../components/infiniteScroll";
import InputBox from "../../components/inputBox";
import { TableComponent } from "../../components/table";
import styles from "./sharedTable.module.scss";
import loaderSpinner from "../../../public/assets/icons/loader.svg";
import {
  IAdditionalValue,
  IButtonState,
  IShowToggle,
} from "@/common/types/candidates.types";
import Image from "next/image";
import { ITechStackList } from "@/common/types";
import { sortDataByField } from "@/common/utils";
import { SORT_TYPE } from "@/common/constants";
import { ISharedTableProps } from "./sharedTable.types";

const sortButtonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  candidates: { upKeyDisabled: false, downKeyDisabled: false },
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

const SharedTable = (props: ISharedTableProps) => {
  const {
    searchValue,
    emptyStateImage,
    emptyStateMessage,
    handleSearch,
    clearSearch,
    isLoading,
    tableData,
    hasNextPage,
    handlePageChange,
    isRecruiter,
    handleStatusChange,
    tableHeader,
    onDataChange,
  } = props;

  const [buttonState, setButtonState] = useState<IButtonState>(
    isRecruiter ? sortButtonData : { name: sortButtonData.name }
  );

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
    onDataChange(newData);
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

  return (
    <React.Fragment>
      <InputBox
        endIcon={searchValue ? Images.close : Images.search}
        onEndIconClick={clearSearch}
        value={searchValue}
        placeholder="Search..."
        onChange={handleSearch}
        customClass={styles.searchBox}
      />
      {!!tableData.length || isLoading ? (
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
              data={tableData}
              hoverCell="techStack"
              additionalValue={isRecruiter ? additionalValue : undefined}
              columnHeaderTitle={tableHeader}
              sortbuttonData={
                isRecruiter ? sortButtonData : { name: sortButtonData.name }
              }
              handleSortArrowClick={handleSortButtonClick}
              onSwitchToggle={handleStatusChange}
              customStyle={customStyle}
              showToggle={isRecruiter ? showToggle : undefined}
              customRowStyling={styles.customRowStyling}
            />
          </InfiniteScroll>
        </React.Fragment>
      ) : (
        !isLoading && (
          <EmptyState image={emptyStateImage} title={emptyStateMessage} />
        )
      )}
    </React.Fragment>
  );
};

export default SharedTable;
