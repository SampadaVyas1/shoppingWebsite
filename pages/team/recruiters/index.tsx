import Search from "@/components/searchBar";
import EmptyState from "@/components/emptyState";
import Images from "@/public/assets/icons";
import { TableComponent } from "@/components/table";
import InfiniteScroll from "@/components/infiniteScroll";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import HeaderTitle from "../../candidates/tableHeaderData.json"
import fakeData from "./mockData.json"
import styles from "./recruiters.module.scss"
import Container from "@/components/container";
const Recruiters = () => {

  const additionalValue: any[] = [
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
  const handlePageChange=()=>{}

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
      {/* <Search />
      <EmptyState
        image={Images.emptyStateImage}
        title="Nothing to see here!"
        subTitle="Click on + to add a recruiter"
      /> */}
      <InfiniteScroll
        nextPage={true}
        handlePageChange={handlePageChange}
        customClass={styles.scroll}
      >
        <TableComponent
          data={fakeData}
          columnHeaderTitle={HeaderTitle}
          // sortbuttonData={sortbuttonData}
          additionalValue={additionalValue}
          // fieldforDateFormat={{ time: TABLE_CONSTANTS.CREATEDTIME }}
          // dataFormatType={DATE_FORMAT.DD_MM_YYYY}
          customStyle={customStyle}
          customRowStyling={styles.customRowStyling}
          // buttonState={buttonState}
          // handleSortArrowClick={handleSortButtonClick}
          // selectedRow={selectedRow}
          // handleRowSelect={handleRowSelect}
          // handleRowEachSelect={handleRowEachSelect}
          // hoverCell={"techStack"} selectedRow={[]} 
      
          />
      </InfiniteScroll>
    </Container>
  );
};

export default Recruiters;
