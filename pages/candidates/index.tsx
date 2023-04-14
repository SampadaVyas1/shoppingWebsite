import React, { CSSProperties } from "react";
import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import ImageComponent from "@/components/image";
import InfiniteScroll from "@/components/infiniteScroll";
import dayjs from "dayjs";
import Table, { Column } from "rc-table";
import { DATE_FORMAT } from "@/common/constants";
import fakeData from "./mockData.json";
import Images from "@/public/assets/icons";
import HeaderTitle from "./tableHeaderData.json";
import CustomCheckBox from "@/components/customCheckBox";

interface IButtonState {
  [key: string]: { upKeyDisabled: boolean; downKeyDisabled: boolean };
}

interface IData {
  [key: string]: any;
}

interface ITableColumnprops {
  customClassName: string;
  title: string;
  key: string;
  rowclassName: string;
  rowcreatorclass: string;
  sort?: boolean;
  moreIcon?: boolean;
  componentCustomClass?: string;
  component?: string;
}
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
  const {
    upArrowDisabled,
    upArrowEnabled,
    downArrowDisabled,
    downArrowEnabled,
  } = Images;
  {
    fakeData.map((column: any) => console.log(column));
  }
  const handlePageChange = () => {
    fakeData.push(...fakeData);
    setData([...fakeData]);
    setButtonState(sortbuttonData);
  };
  function onChange(checked: any, record: any) {
    console.log(`checked = ${checked}, record = ${JSON.stringify(record)}`);
  }

  function CheckboxCell({ record }: any) {
    return <CustomCheckBox checked={record.checked} />;
  }

  const generateColumns = (HeaderTitle: any) => {
    return (
      !!HeaderTitle &&
      HeaderTitle?.map((column: any) => {
        function toCamelCase(str: string) {
          let words = str.toLowerCase().split(/[\s-]+/);
          for (let i = 1; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
          }
          return words.join("");
        }
        const dataIndex = toCamelCase(column.title);
        return (
          <Column
            title={
              <div className={styles.header}>
                {column.title === "checkbox" ? (
                  <CustomCheckBox />
                ) : (
                  <div className={styles.title}>{column.title}</div>
                )}
                {!!column.sort && (
                  <div className={styles.sortIcon}>
                    <ImageComponent
                      src={upArrowEnabled}
                      width={10}
                      height={10}
                      className={styles.ascendingicon}
                    />
                    <ImageComponent
                      src={downArrowEnabled}
                      width={10}
                      height={10}
                      className={styles.ascendingicon}
                    />
                  </div>
                )}
              </div>
            }
            dataIndex={column.dataIndex}
            key={column.key}
            render={(text:any, record: any) =>
              column.title == "checkbox" ? (
                <CheckboxCell record={record} />
              ) : (
                <div className={styles.cell}>
                  <div>
                    {dataIndex === "createdTime" ? (
                      <>
                        {dayjs(record["createdTime"]).format(
                          DATE_FORMAT.DDMMYYYY
                        )}
                      </>
                    ) : (
                      <> {record[dataIndex]} </>
                    )}
                  </div>
                  {dataIndex === "name" ? (
                    <div>{record["designation"]}</div>
                  ) : null}
                </div>
              )
            }
          />
        );
      })
    );
  };

  return (
    <InfiniteScroll
      nextPage={true}
      handlePageChange={handlePageChange}
      customClass={styles.scroll}
    >
      <Table data={fakeData} className={styles["rc-table"]}>
        {generateColumns(HeaderTitle)}
      </Table>
    </InfiniteScroll>
  );
};
export default Candidates;
