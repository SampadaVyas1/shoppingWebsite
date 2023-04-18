import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import ImageComponent from "@/components/image";
import InfiniteScroll from "@/components/infiniteScroll";
import CustomCheckBox from "@/components/customCheckBox";
import dayjs from "dayjs";
import Table, { Column } from "rc-table";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import fakeData from "./mockData.json";
import Images from "@/public/assets/icons";
import HeaderTitle from "./tableHeaderData.json";
import {
  checkIdeal,
  checkMaster,
  checkRow,
  handleAllRowSelect,
  handleAscendingSort,
  handleDescendingSort,
  handleRowEachSelect,
  handleSort,
} from "@/common/utils";
interface IButtonState {
  [key: string]: { upKeyDisabled: boolean; downKeyDisabled: boolean };
}

interface IData {
  [key: string]: any;
}

interface IRecordProps {
  id: number;
  name: string;
  designation: string;
  mobileNumber: string;
  experienceLevel: string;
  createdTime: string;
  status: string;
  recruiter: string;
  techStack: string;
  time: string;
}
const sortbuttonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  experienceLevel: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
  mobileNumber: { upKeyDisabled: false, downKeyDisabled: false },
  techStack: { upKeyDisabled: false, downKeyDisabled: false },
  recruiter: { upKeyDisabled: false, downKeyDisabled: false },
  status: { upKeyDisabled: false, downKeyDisabled: false },
};
interface IHeaderTitleProps {
  id: string;
  title: string;
  sort?: boolean | false;
}

const Candidates = () => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [buttonState, setButtonState] = useState(sortbuttonData);
  const {
    upArrowDisabled,
    upArrowEnabled,
    downArrowDisabled,
    downArrowEnabled,
  } = Images;

  const handleUpArrowClick = (field: string) => {
    !buttonState[field].upKeyDisabled &&
      handleAscendingSort(field, setButtonState, data, setData);
  };
  const handleDownArrowClick = (field: string) => {
    !buttonState[field].downKeyDisabled &&
      handleDescendingSort(field, setButtonState, data, setData);
  };

  const handlePageChange = () => {
    fakeData.push(...fakeData);
    setData([...fakeData]);
    setButtonState(sortbuttonData);
  };

  const handleRowSelect = (value: number[]) => {
    setSelectedRow(value);
  };

  const handleCheckBoxClick = useCallback(
    (id: number) => () => {
      handleRowEachSelect(id, selectedRow, handleRowSelect);
    },
    [selectedRow]
  );

  useEffect(() => {
    const newData = handleSort(fakeData, "name", true);
    setData(newData);
    setButtonState({
      ...buttonState,
      name: {
        ...buttonState["name"],
        upKeyDisabled: true,
        downKeyDisabled: false,
      },
    });
  }, []);

  const generateColumns = (HeaderTitle: IHeaderTitleProps[]) => {
    return (
      !!HeaderTitle &&
      HeaderTitle?.map((column: IHeaderTitleProps) => {
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
                  <CustomCheckBox
                    ideal={checkIdeal(selectedRow, data)}
                    checked={checkMaster(selectedRow, data)}
                    handleClick={handleAllRowSelect(
                      data,
                      selectedRow,
                      handleRowSelect
                    )}
                    customClass={styles.checkBoxStyling}
                  />
                ) : (
                  <div className={styles.title}>{column.title}</div>
                )}
                {!!column.sort && (
                  <div className={styles.sortIcon}>
                    <ImageComponent
                      src={
                        buttonState[dataIndex].upKeyDisabled
                          ? upArrowDisabled
                          : upArrowEnabled
                      }
                      width={10}
                      height={10}
                      onClick={() => handleUpArrowClick(dataIndex)}
                      className={styles.ascendingicon}
                    />
                    <ImageComponent
                      src={
                        buttonState[dataIndex].downKeyDisabled
                          ? downArrowDisabled
                          : downArrowEnabled
                      }
                      width={10}
                      height={10}
                      onClick={() => handleDownArrowClick(dataIndex)}
                      className={styles.ascendingicon}
                    />
                  </div>
                )}
              </div>
            }
            dataIndex={dataIndex}
            key={dataIndex}
            render={(text: string, record: IRecordProps, index: number) =>
              column.title == "checkbox" ? (
                <CustomCheckBox
                  id={data[index]["id"]}
                  handleClick={handleCheckBoxClick(data[index]["id"])}
                  checked={checkRow(data[index]["id"], selectedRow)}
                  customClass={styles.checkBoxStyling}
                />
              ) : (
                <div className={styles.cell}>
                  <div>
                    {dataIndex === "createdTime" ? (
                      <div>
                        {dayjs(data[index]["createdTime"]).format(
                          DATE_FORMAT.DD_MM_YYYY
                        )}
                      </div>
                    ) : (
                      <> {data[index][dataIndex]} </>
                    )}
                  </div>
                  {dataIndex === "name" ? (
                    <div className={styles.designation}>
                      {data[index][TABLE_CONSTANTS.DESIGNATION]}
                    </div>
                  ) : null}
                  {dataIndex === "createdTime" ? (
                    <div className={styles.time}>{data[index][TABLE_CONSTANTS.TIME]}</div>
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
      <Table data={data} className={styles["rc-table"]}>
        {generateColumns(HeaderTitle)}
      </Table>
    </InfiniteScroll>
  );
};
export default Candidates;
