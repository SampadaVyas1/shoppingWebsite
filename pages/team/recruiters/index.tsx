import Search from "@/components/searchBar";
import EmptyState from "@/components/emptyState";
import Images from "@/public/assets/icons";
import { TableComponent } from "@/components/table";
import InfiniteScroll from "@/components/infiniteScroll";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import fakeData from "./mockData.json";
import styles from "./recruiters.module.scss";
import Container from "@/components/container";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import InputBox from "@/components/inputBox";
const Recruiters = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<boolean>(true);
  const keys = !!data && data[0] && Object?.keys(data[0]);
  const tableHeader =
    !!keys &&
    keys.map((key: any, index: any) => {
      let sort = key === "Name" || key === "Candidates" ? true : false;
      return {
        id: index + 1,
        title: key,
        sort: sort,
        dataIndex: key,
        key: key,
      };
    });
  const filteredHeaderData =
    !!tableHeader && tableHeader.filter((obj: any) => /^[A-Z]/.test(obj.title));
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
  const handlePageChange = () => {};

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

  useEffect(() => {
    const updatedData =
      !!fakeData &&
      fakeData.map((item: any) => {
        return {
          ...item,
          Name: `${item.mobileNumber}`,
          "Mobile number": `${item.mobileNumber}`,
          "Email ID": `${item.experienceLevel}`,
          "Tech stack": `${item.techStack}`,
          Candidates: `${item.createdAt}`,
          Status: `${item.interviewStatus}`,
        };
      });
    setData(updatedData);
    // setButtonState({
    //   ...buttonState,
    //   Name: {
    //     ...buttonState["Name"],
    //     upKeyDisabled: true,
    //     downKeyDisabled: false,
    //   },
    // });
  }, []);
  const handleSearch = () => {};

  return (
    // <Container>
    //   {/* <Search />
    //   <EmptyState
    //     image={Images.emptyStateImage}
    //     title="Nothing to see here!"
    //     subTitle="Click on + to add a recruiter"
    //   /> */}
    //   <InfiniteScroll
    //     nextPage={true}
    //     handlePageChange={handlePageChange}
    //     customClass={styles.scroll}
    //   >
    //     <TableComponent
    //       data={data}
    //       columnHeaderTitle={filteredHeaderData}
    //       // sortbuttonData={sortbuttonData}
    //       additionalValue={additionalValue}
    //       // fieldforDateFormat={{ time: TABLE_CONSTANTS.CREATEDTIME }}
    //       // dataFormatType={DATE_FORMAT.DD_MM_YYYY}
    //       customStyle={customStyle}
    //       customRowStyling={styles.customRowStyling}
    //       // buttonState={buttonState}
    //       // handleSortArrowClick={handleSortButtonClick}
    //       // selectedRow={selectedRow}
    //       // handleRowSelect={handleRowSelect}
    //       // handleRowEachSelect={handleRowEachSelect}
    //       // hoverCell={"techStack"} selectedRow={[]}
    //     />
    //   </InfiniteScroll>
    // </Container>

    <div>Recruiter</div>

    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : data.length === 0 ? (
    //     <div className={styles.emptyState}>
    //       <EmptyState
    //         image={Images.emptyStateImage}
    //         title="Nothing to see here!"
    //         subTitle="Click on + to add a recruiter"
    //       />
    //     </div>
    //   ) : (
    //     <Container>
    //       <div className={styles.header}>
    //         <div className={styles.searchBox}>
    //           <InputBox
    //             endIcon={Images.search}
    //             placeholder="Search..."
    //             onEndIconClick={Images.searchIcon}
    //             className={styles.search}
    //             onChange={handleSearch}
    //           />
    //         </div>
    //       </div>
    //       <InfiniteScroll
    //         nextPage={nextPage}
    //         handlePageChange={handlePageChange}
    //         customClass={styles.scroll}
    //       >
    //         <TableComponent
    //           data={data}
    //           columnHeaderTitle={filteredHeaderData}
    //           // sortbuttonData={sortbuttonData}
    //           additionalValue={additionalValue}
    //           // fieldforDateFormat={{ time: TABLE_CONSTANTS.CREATEDTIME }}
    //           // dataFormatType={DATE_FORMAT.DD_MM_YYYY}
    //           customStyle={customStyle}
    //           customRowStyling={styles.customRowStyling}
    //           // buttonState={buttonState}
    //           // handleSortArrowClick={handleSortButtonClick}
    //           // selectedRow={selectedRow}
    //           // handleRowSelect={handleRowSelect}
    //           // handleRowEachSelect={handleRowEachSelect}
    //           // hoverCell={"techStack"} selectedRow={[]}
    //         />
    //       </InfiniteScroll>
    //     </Container>
    //   )}
    // </>
  );
};

export default Recruiters;
