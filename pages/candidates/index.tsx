import { useEffect, useState, CSSProperties } from "react";
import styles from "./candidates.module.scss";
import ImageComponent from "@/components/image";
import InfiniteScroll from "@/components/infiniteScroll";
import Table, { Column } from "rc-table";
import fakeData from "./mockData.json";
import Images from "@/public/assets/icons";
import HeaderTitle from "./tableHeaderData.json";
import CustomCheckBox from "@/components/customCheckBox";
import TableCells from "@/components/table";
import {
  IButtonState,
  IData,
  IHeaderTitleProps,
  IRecordProps,
} from "./candidates.types";
import { toCamelCase } from "@/common/utils";
import Typography from "@/components/typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";

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

  const generateColumns = (HeaderTitle: IHeaderTitleProps[]) => {
    return (
      !!HeaderTitle &&
      HeaderTitle?.map((column: IHeaderTitleProps) => {
        const dataIndex = toCamelCase(column.title);
        return (
          <Column
            title={
              <div className={styles.header}>
                {column.title === "checkbox" ? (
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
              column.title == "checkbox" ? (
                <CustomCheckBox checked={record.checked} />
              ) : (
                <TableCells dataIndex={dataIndex} record={record} />
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
