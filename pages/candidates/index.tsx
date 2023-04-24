import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import styles from "./candidates.module.scss";
import ImageComponent from "@/components/image";
import InfiniteScroll from "@/components/infiniteScroll";
import CustomCheckBox from "@/components/customCheckBox";
import Table, { Column } from "rc-table";
import {TABLE_CONSTANTS } from "@/common/constants";
import fakeData from "./mockData.json";
import Images from "@/public/assets/icons";
import HeaderTitle from "./tableHeaderData.json";
import {
  checkIdeal,
  checkMaster,
  checkRow,
  handleAllRowSelect,
  descendingSort,
  ascendingSort,
  handleRowEachSelect,
  sortDataByField,
  toCamelCase,
} from "@/common/utils";
import TableCells from "@/components/table";
import Typography from "@/components/typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { IButtonState, IData, IHeaderTitleProps, IRecordProps } from "./candidates.types";

const sortbuttonData: IButtonState = {
  name: { upKeyDisabled: false, downKeyDisabled: false },
  experienceLevel: { upKeyDisabled: false, downKeyDisabled: false },
  createdTime: { upKeyDisabled: false, downKeyDisabled: false },
  mobileNumber: { upKeyDisabled: false, downKeyDisabled: false },
  techStack: { upKeyDisabled: false, downKeyDisabled: false },
  recruiter: { upKeyDisabled: false, downKeyDisabled: false },
  status: { upKeyDisabled: false, downKeyDisabled: false },
};

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
      setData(ascendingSort(field, setButtonState, data));
  };
  const handleDownArrowClick = (field: string) => {
    !buttonState[field].downKeyDisabled &&
      setData(descendingSort(field, setButtonState, data));
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
    const newData = sortDataByField(fakeData, TABLE_CONSTANTS.NAME, true);
    setData(newData);
    setButtonState({
      ...buttonState,
      name: {
        ...buttonState[ TABLE_CONSTANTS.NAME],
        upKeyDisabled: true,
        downKeyDisabled: false,
      },
    });
  }, []);

  const generateColumns = (HeaderTitle: IHeaderTitleProps[]) => {
    return (
      !!HeaderTitle &&
      HeaderTitle?.map((column: IHeaderTitleProps) => {
        const dataIndex = toCamelCase(column.title);
        return (
          <Column
            title={
              <div className={styles.header}>
                {column.title === TABLE_CONSTANTS.CHECKBOX ? (
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
                  <Typography
                    variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}
                    children={column.title}
                    customStyle={styles.title}
                  />
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
              column.title == TABLE_CONSTANTS.CHECKBOX ? (
                <CustomCheckBox
                  id={data[index]["id"]}
                  handleClick={handleCheckBoxClick(data[index]["id"])}
                  checked={checkRow(data[index]["id"], selectedRow)}
                  customClass={styles.checkBoxStyling}
                />
              ) : (
                // <TableCells dataIndex={dataIndex} data={data} index={index} />
                <TableCells
                  dataIndex={dataIndex}
                  data={data}
                  index={index}
                  field={{ time: "createdTime" }}
                  colspans={[
                    {
                      colspan: "name",
                      colspanValue: "designation",
                      customStyle: styles.designation,
                    },
                    { colspan: "createdTime", colspanValue: "time" },
                  ]}
                />
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
      <Table data={data} className={styles.rcTable}>
        {generateColumns(HeaderTitle)}
      </Table>
    </InfiniteScroll>
  );
};
export default Candidates;
