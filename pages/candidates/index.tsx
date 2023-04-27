import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import fakeData from "./mockData.json";
import { IAdditionalValue, IButtonState, IData } from "./candidates.types";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import { TableComponent } from "@/components/table";
import HeaderTitle from "./tableHeaderData.json";
import { sortDataByField } from "@/common/utils";

const sortbuttonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
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

  const ascendingSort = (field: string, data: IData[]) => {
    setButtonState((buttonState: IButtonState) => ({
      ...buttonState,
      [field]: {
        ...buttonState[field],
        upKeyDisabled: true,
        downKeyDisabled: false,
      },
    }));
    const newData = !!data && sortDataByField(data, field, true);
    return newData;
  };

  const descendingSort = (field: string, data: IData[]) => {
    setButtonState((buttonState: IButtonState) => ({
      ...buttonState,
      [field]: {
        ...buttonState[field],
        upKeyDisabled: false,
        downKeyDisabled: true,
      },
    }));
    const newData = !!data && sortDataByField(data, field, false);
    return newData;
  };
  const handleUpArrowClick = (field: string) => {
    !buttonState[field].upKeyDisabled && setData(ascendingSort(field, data));
  };

  const handleDownArrowClick = (field: string) => {
    !buttonState[field].downKeyDisabled && setData(descendingSort(field, data));
  };

  const handlePageChange = () => {
    fakeData.push(...fakeData);
    setData([...fakeData]);
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
        handleRowEachSelect={handleRowEachSelect}
      />
    </InfiniteScroll>
  );
};
export default Candidates;
