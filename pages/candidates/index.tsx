import { useEffect, useState, CSSProperties } from "react";
import styles from "./candidates.module.scss";
import ImageComponent from "@/components/image";
import InfiniteScroll from "@/components/infiniteScroll";
import { toCamelCase } from "@/common/utils";
import Typography from "@/components/typography";
import CustomCheckBox from "@/components/customCheckBox";
import { Table as Tables } from "../../components/table/index";
import Table from "rc-table";
import { Column } from "rc-table";
import fakeData from "./mockData.json";
import Images from "@/public/assets/icons";
import HeaderTitle from "./tableHeaderData.json";
import {
  IButtonState,
  IData,
  IHeaderTitleProps,
  IRecordProps,
} from "./candidates.types";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { TABLE_CONSTANTS } from "@/common/constants";

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

  const handlePageChange = () => {
    fakeData.push(...fakeData);
    setData([...fakeData]);
    setButtonState(sortbuttonData);
  };
  const colspans = [
    {
      colspan: TABLE_CONSTANTS.NAME,
      colspanValue: TABLE_CONSTANTS.DESIGNATION,
      customStyle: styles.designation,
    },
    { colspan: TABLE_CONSTANTS.CREATEDTIME, colspanValue: TABLE_CONSTANTS.TIME },
  ];
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
                  <CustomCheckBox />
                ) : (
                  <Typography
                    variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
                    children={column.title}
                    customStyle={styles.title}
                  />
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
            dataIndex={dataIndex}
            key={dataIndex}
            render={(text: string, record: IRecordProps) =>
              column.title == TABLE_CONSTANTS.CHECKBOX ? (
                <CustomCheckBox checked={record.checked} />
              ) : (
                <Tables
                  dataIndex={dataIndex}
                  record={record}
                  field={{ time: TABLE_CONSTANTS.CREATEDTIME }}
                  colspans={colspans}
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
      <Table data={fakeData} className={styles.rcTable}>
        {generateColumns(HeaderTitle)}
      </Table>
    </InfiniteScroll>
  );
};
export default Candidates;
