import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import fakeData from "./mockData.json";
import { TableComponent } from "@/components/table";
import HeaderTitle from "./tableHeaderData.json";
import { TABLE_CONSTANTS, DATE_FORMAT } from "@/common/constants";
import {
  IButtonState,
  ICandidatesProps,
  IData,
  IAdditionalValue,
} from "@/common/types/candidates.types";

const sortbuttonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
};

const Candidates = (props: ICandidatesProps) => {
  const [data, setData] = useState<IData[] | null>(null);
  const [buttonState, setButtonState] = useState<IButtonState>(sortbuttonData);

  const additionalValue: IAdditionalValue[] = [
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

  function handlePageChange(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <InfiniteScroll
      nextPage={true}
      handlePageChange={handlePageChange}
      customClass={`${styles.scroll} ${props.customScrollStyle}`}
    >
      <TableComponent
        data={fakeData}
        columnHeaderTitle={HeaderTitle}
        sortbuttonData={sortbuttonData}
        additionalValue={additionalValue}
        fieldforDateFormat={{ time: TABLE_CONSTANTS.CREATEDTIME }}
        dataFormatType={DATE_FORMAT.DD_MM_YYYY}
        customStyle={customStyle}
        customRowStyling={styles.customRowStyling}
      />
    </InfiniteScroll>
  );
};
export default Candidates;
