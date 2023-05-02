import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import fakeData from "./mockData.json";
import { IAdditionalValue, IButtonState, IData } from "./candidates.types";
import { DATE_FORMAT, SORT_Type, TABLE_CONSTANTS } from "@/common/constants";
import { TableComponent } from "@/components/table";
import HeaderTitle from "./tableHeaderData.json";
import { sortDataByField } from "@/common/utils";
import Container from "@/components/container";
import Search from "@/components/searchBar";
import Images from "@/public/assets/icons";
import ImageComponent from "@/components/image";
import Tag from "@/components/tag/tag";
import filterData from "./filterData.json"
const sortbuttonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
};

const Candidates = () => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState(sortbuttonData);
  const [activeTags, setActiveTags] = useState<{ [key: number]: boolean }>({});

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

  const handleSortButtonClick = (field: string, sortType: string) => {
    sortType === SORT_Type.ASCENDING
      ? !buttonState[field].upKeyDisabled &&
        setData(toggleSortButton(field, data, true, false))
      : sortType === SORT_Type.DESCENDING
      ? !buttonState[field].downKeyDisabled &&
        setData(toggleSortButton(field, data, false, true))
      : null;
  };

  const handleClickHeaderTag = (id: number) => {
    setActiveTags((prevActiveTags: any) => ({
      ...prevActiveTags,
      [id]: !prevActiveTags[id],
    }));
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
    <Container>
      <div className={styles.header}>
        <Search
          placeholder={"Search..."}
          endIcon={Images.searchIcon}
          customStyle={styles.search}
        />
        <div className={styles.tagList}>
          {!!filterData &&
            filterData.map((filterValue: any) => (
              <Tag
                tagValue={filterValue}
                onClick={() => handleClickHeaderTag(filterValue.id)}
                customClass={
                  activeTags[filterValue.id] ? styles.contained : styles.default
                }
                key={filterValue.id}
              />
            ))}
          <ImageComponent src={Images.filterIcon} customClass={styles.icons} />
        </div>
      </div>
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
          handleSortArrowClick={handleSortButtonClick}
          selectedRow={selectedRow}
          handleRowSelect={handleRowSelect}
          handleRowEachSelect={handleRowEachSelect}
          hoverCell={"techStack"}
        />
      </InfiniteScroll>
    </Container>
  );
};
export default Candidates;
