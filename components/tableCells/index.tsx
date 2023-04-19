import React from "react";
import dayjs from "dayjs";
import styles from "./tableCells.module.scss";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import { ITableCells } from "./table.types";
const TableCells = (props: ITableCells) => {
  const { dataIndex, record } = props;
  return (
    <div className={styles.tableCell}>
      <div>
        {dataIndex === TABLE_CONSTANTS.CREATEDTIME ? (
          <div>
            {dayjs(record[TABLE_CONSTANTS.CREATEDTIME]).format(
              DATE_FORMAT.DD_MM_YYYY
            )}
          </div>
        ) : (
          <> {record[dataIndex]} </>
        )}
      </div>
      {dataIndex === TABLE_CONSTANTS.NAME ? (
        <div className={styles.designation}>
          {record[TABLE_CONSTANTS.DESIGNATION]}
        </div>
      ) : null}
      {dataIndex === TABLE_CONSTANTS.CREATEDTIME ? (
        <div className={styles.time}>{record[TABLE_CONSTANTS.TIME]}</div>
      ) : null}
    </div>
  );
};

export default TableCells;
