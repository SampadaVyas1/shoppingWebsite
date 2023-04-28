import { Fragment, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import fakeData from "./mockData.json";
import HeaderTitle from "./tableHeaderData.json";
import { IAdditionalValue, IButtonState, IData } from "./candidates.types";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import { TableComponent } from "@/components/table";
import Search from "@/components/searchBar";
import Container from "@/components/container";
import Images from "@/public/assets/icons";
import Tag from "@/components/tag/tag";
import filterData from "./filterData.json";
import ImageComponent from "../../components/image";
const sortbuttonData = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  experienceLevel: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
  mobileNumber: { upKeyDisabled: false, downKeyDisabled: false },
  techStack: { upKeyDisabled: false, downKeyDisabled: false },
  recruiter: { upKeyDisabled: false, downKeyDisabled: false },
  status: { upKeyDisabled: false, downKeyDisabled: false },
};

const Candidates = () => {
  const [data, setData] = useState<IData[] | null>(null);
  const [buttonState, setButtonState] = useState<IButtonState>(sortbuttonData);
  const [activeTags, setActiveTags] = useState<{ [key: number]: boolean }>({});

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
                  activeTags[filterValue.id]  ? styles.contained : styles.default
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
    </Container>
  );
};
export default Candidates;
