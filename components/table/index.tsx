import React from "react";
import dayjs from "dayjs";
import styles from "./tableCells.module.scss";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import { ITableCells } from "./table.types";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
const TableCells = (props: ITableCells) => {
  const { dataIndex, record } = props;
  return (
    <div className={styles.tableCell}>
      <div>
        {dataIndex === "createdTime" ? (
          <div>
            {dayjs(record["createdTime"]).format(DATE_FORMAT.DD_MM_YYYY)}
          </div>
        ) : (
          <> {record[dataIndex]} </>
        )}
      </div>
      {dataIndex === "name" ? (
        <Typography
          children={record["designation"]}
          variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
          customStyle={styles.designation}
        />
      ) : null}
      {dataIndex === "createdTime" ? (
        <Typography children={record[TABLE_CONSTANTS.TIME]} />
      ) : null}
    </div>
  );
};

export default TableCells;
