import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import InfiniteScroll from "@/components/infiniteScroll";
import fakeData from "./mockData.json";
import { IAdditionalValue, IButtonState, IData } from "./candidates.types";
import { DATE_FORMAT, SORT_Type, TABLE_CONSTANTS } from "@/common/constants";
import { TableComponent } from "../../components/table/index";
import { sortDataByField } from "@/common/utils";
import { getCandidatesData } from "@/services/candidate.service";

const sortbuttonData: IButtonState = {
  Name: { upKeyDisabled: false, downKeyDisabled: false },
 " Created time": { upKeyDisabled: false, downKeyDisabled: false },
};

const Candidates = () => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState(sortbuttonData);
  const [pageNumber, setPageNumber] = useState(1);

  const keys = !!data && data[0] && Object?.keys(data[0]);
  const tableHeader =
    !!keys &&
    keys.map((key, index) => {
      let sort = key === "Name" || key === "Created time" ? true : false;
      return {
        id: index + 1,
        title: key,
        sort: sort,
        dataIndex: key,
        key: key,
      };
    });
  const filteredHeaderData =
    !!tableHeader && tableHeader.filter((obj) => /^[A-Z]/.test(obj.title));
  console.log(filteredHeaderData);
  const additionalValue: IAdditionalValue[] = [
    {
      colspan: "Name",
      colspanValue: "postingTitle",
      customStyle: styles.designation,
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

  const handlePageChange = async () => {
    // fakeData.push(...fakeData);
    // setData([...fakeData]);
    // setButtonState(sortbuttonData);
    const response = await getCandidatesData({
      limit: 10,
      page: pageNumber + 1,
    });
    console.log(response);
    // setData(data.concat(response.data));
    setPageNumber(pageNumber + 1);
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
    // const fetchData = async () => {
    //   const response = await getCandidatesData();
    //   return response?.data?.data?.candidates;
    // };

    // const getCandidates = async () => {
    //   const getdata = await fetchData();
    //   // setData(getdata);
    //   const updatedData =
    //     !!getdata &&
    //     getdata.map((item: any) => {
    //       return {
    //         ...item,
    //         Name: `${item.firstName} ${item.lastName}`,
    //         Recruiter: `${item.recruiterName} ${item.recruiterlastName}`,
    //       };
    //     });
    //   setData(updatedData);
    //   console.log(updatedData);
    // };
    // getCandidates();

    // const newData = sortDataByField(fakeData, TABLE_CONSTANTS.NAME, true);
    const updatedData =
      !!fakeData &&
      fakeData.map((item: any) => {
        return {
          ...item,
          Name: `${item.firstName} ${item.lastName}`,
          "Mobile Number": `${item.mobileNumber}`,
          "Experience level": `${item.experienceLevel}`,
          "Tech stack": `${item.techStack}`,
          "Created time": `${item.createdAt}`,
          Recruiter: `${item.recruiterName} ${item.recruiterlastName}`,
          Status: `${item.interviewStatus}`,
        };
      });
    setData(updatedData);
    // setButtonState({
    //   ...buttonState,
    //   name: {
    //     ...buttonState[TABLE_CONSTANTS.NAME],
    //     upKeyDisabled: true,
    //     downKeyDisabled: false,
    //   },
    // });
  }, []);

  return (
    <InfiniteScroll
      nextPage={true}
      handlePageChange={handlePageChange}
      customClass={styles.scroll}
    >
      <TableComponent
        data={data}
        columnHeaderTitle={filteredHeaderData}
        sortbuttonData={sortbuttonData}
        additionalValue={additionalValue}
        fieldforDateFormat={{ time: "Created time" }}
        dataFormatType={DATE_FORMAT.DD_MM_YYYY}
        customStyle={customStyle}
        customRowStyling={styles.customRowStyling}
        buttonState={buttonState}
        handleSortArrowClick={handleSortButtonClick}
        selectedRow={selectedRow}
        handleRowSelect={handleRowSelect}
        handleRowEachSelect={handleRowEachSelect}
      />
    </InfiniteScroll>
  );
};
export default Candidates;
