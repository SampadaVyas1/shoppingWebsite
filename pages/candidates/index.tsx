import { Fragment, useEffect, useState } from "react";
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
import tagList from "./tag.json";
import Typography from "@/components/typography";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import Button from "@/components/button";
import filterData from "./filterData.json";

const sortbuttonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
};
const Candidates = () => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState(sortbuttonData);
  const [activeTags, setActiveTags] = useState<{ [key: number]: boolean }>({});
  const [filterContainer, setShowFilter] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
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
  const handleFilter = () => {
    setShowFilter(true);
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

  function getValuesByKey(filterData: any, keyName: string) {
    const filterBy = filterData.filterBy || [];
    const filterObj = filterBy.find((obj: any) => obj.hasOwnProperty(keyName));
    return filterObj ? filterObj[keyName] : null;
  }
  const handleFilterClick = (keyName: any) => {
    setSelectedKey(keyName);
  };
  const values = selectedKey ? getValuesByKey(filterData, selectedKey) : null;

  return (
    <Container>
      <div className={styles.header}>
        <Search
          placeholder={"Search..."}
          endIcon={Images.searchIcon}
          customStyle={styles.search}
        />
        <div className={styles.tagList}>
          {!!tagList &&
            tagList.map((filterValue: any) => (
              <Tag
                tagValue={filterValue}
                onClick={() => handleClickHeaderTag(filterValue.id)}
                customClass={
                  activeTags[filterValue.id] ? styles.contained : styles.default
                }
                key={filterValue.id}
              />
            ))}

          <ImageComponent
            src={Images.filterIcon}
            customClass={styles.icons}
            onClick={handleFilter}
          />
        </div>
        {filterContainer && (
          <Container customClass={styles.filterContainer}>
            <div className={styles.filter}>
              <div className={styles.filterheader}>
                <Typography
                  variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}
                  customStyle={styles.filterHeaderLeft}
                >
                  Filter By
                </Typography>
                <Typography
                  variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}
                  customStyle={styles.headerRight}
                >
                  Clear all
                </Typography>
              </div>
              {filterData.filterBy &&
                filterData.filterBy.map((item: any) => {
                  const keyName = Object.keys(item)[0];
                  return (
                    <div
                      className={styles.filterData}
                      onClick={ ()=>handleFilterClick(keyName)}
                    >
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}
                      >
                        {keyName}
                      </Typography>
                      <ImageComponent
                        src={Images.rightArrow}
                        height={24}
                        width={24}
                      />
                    </div>
                  );
                })}
              {values && (
                <div>
                  <Typography>{selectedKey} values:</Typography>
                  <ul>
                    {values.map((value: any) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.filter}>
              <Button variant={BUTTON_VARIANT.OUTLINED}>Cancel</Button>
              <Button variant={BUTTON_VARIANT.CONTAINED}>Apply filters</Button>
            </div>
          </Container>
        )}
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
        <ImageComponent
         src={Images.addButton}
         customClass={styles.addButton}
         height={40}
         width={40}
        //  onClick={}
         />
      </InfiniteScroll>
    </Container>
  );
};
export default Candidates;
