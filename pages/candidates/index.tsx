import { Fragment, useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import { Popover } from "react-tiny-popover";
import fakeData from "./mockData.json";
import { IAdditionalValue, IButtonState, IData } from "./candidates.types";
import { DATE_FORMAT, SORT_Type, TABLE_CONSTANTS } from "@/common/constants";
import { TableComponent } from "@/components/table";
import HeaderTitle from "./tableHeaderData.json";
import { sortDataByField } from "@/common/utils";
import Container from "@/components/container";
import Images from "@/public/assets/icons";
import ImageComponent from "../../components/imageComponent/index";
import Tag from "@/components/tag/tag";
import tagList from "./tag.json";
import filterData from "./filterData.json";
import AddForm from "@/components/addForm";
import Modal from "@/components/modal";
import Filter from "@/components/filterComponent";
import { TOOLTIP_POSITION } from "@/common/enums";
import TransitionWrapper from "@/components/transitionWrapper";
import Image from "next/image";
import InputBox from "@/components/inputBox";

const sortbuttonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
};
const Candidates = () => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState(sortbuttonData);
  const [activeTags, setActiveTags] = useState<{ [key: number]: boolean }>({});
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [isFilterOpen, setisFilterOpen] = useState(false);

  const closeFilter = () => {
    setisFilterOpen(false);
  };

  const toggleFilter = (event: any) => {
    event.stopPropagation();
    setisFilterOpen(!isFilterOpen);
  };

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
        <div className={styles.searchBox}>
          <InputBox
            endIcon={Images.search}
            placeholder="Search..."
            onEndIconClick={Images.searchIcon}
            className={styles.search}
          />
        </div>
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
                  filterData={filterData.filterBy}
                  onclose={closeFilter}
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
          onClick={() => setAddButtonClicked(true)}
        />
      </InfiniteScroll>
      <Modal
        open={addButtonClicked}
        onClose={() => setAddButtonClicked(false)}
        header="Add Candidate"
        showCloseIcon
      >
        <AddForm />
      </Modal>
    </Container>
  );
};
export default Candidates;
