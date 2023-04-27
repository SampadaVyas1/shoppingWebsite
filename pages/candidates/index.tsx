import { useCallback, useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import fakeData from "./mockData.json";
import { IAdditionalValue, IButtonState, IData } from "./candidates.types";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import { TableComponent } from "@/components/table";
import HeaderTitle from "./tableHeaderData.json";
import {
  ascendingSort,
  descendingSort,
  handleRowEachSelect,
  sortDataByField,
} from "@/common/utils";

const sortbuttonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  experienceLevel: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
  mobileNumber: { upKeyDisabled: false, downKeyDisabled: false },
  techStack: { upKeyDisabled: false, downKeyDisabled: false },
  recruiter: { upKeyDisabled: false, downKeyDisabled: false },
  status: { upKeyDisabled: false, downKeyDisabled: false },
};

const Candidates = () => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState(sortbuttonData);

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

  const handleUpArrowClick = (field: string) => {
    !buttonState[field].upKeyDisabled &&
      setData(ascendingSort(field, setButtonState, data));
  };
  
  const handleDownArrowClick = (field: string) => {
    !buttonState[field].downKeyDisabled &&
      setData(descendingSort(field, setButtonState, data));
  };

  const handlePageChange = () => {
    fakeData.push(...fakeData);
    setData([...fakeData]);
    setButtonState(sortbuttonData);
  };

  const handleRowSelect = (value: number[]) => {
    setSelectedRow(value);
  };

  const handleCheckBoxClick = (id: number)  => {
      handleRowEachSelect(id, selectedRow, handleRowSelect);
    }
   
  useEffect(() => {
    const newData = sortDataByField(fakeData, TABLE_CONSTANTS.NAME, true);
    setData(newData);
    setButtonState({
      ...buttonState,
      name: {
        ...buttonState[TABLE_CONSTANTS.NAME],
        upKeyDisabled: true,
        downKeyDisabled: false,
      },
    });
  }, []);
  return (
    <InfiniteScroll
      nextPage={true}
      handlePageChange={handlePageChange}
      customClass={styles.scroll}
    >
      <TableComponent
        data={data}
        columnHeaderTitle={HeaderTitle}
        sortbuttonData={sortbuttonData}
        additionalValue={additionalValue}
        fieldforDateFormat={{ time: TABLE_CONSTANTS.CREATEDTIME }}
        dataFormatType={DATE_FORMAT.DD_MM_YYYY}
        customStyle={customStyle}
        customRowStyling={styles.customRowStyling}
        buttonState={buttonState}
        handleUpArrowClick={handleUpArrowClick}
        handleDownArrowClick={handleDownArrowClick}
        selectedRow={selectedRow}
        handleRowSelect={handleRowSelect}
        handleCheckBoxClick={handleCheckBoxClick}
      />
    </InfiniteScroll>
  );
};
export default Candidates;
