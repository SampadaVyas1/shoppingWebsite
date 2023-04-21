import React, { Fragment } from "react";
import dayjs from "dayjs";
import styles from "./tableCells.module.scss";
import { DATE_FORMAT, TABLE_CONSTANTS } from "@/common/constants";
import { ITableCells } from "./table.types";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
const TableCells = (props: ITableCells) => {
  const { dataIndex, record, field, colspans } = props;
  return (
    <div className={styles.tableCell}>
      <div>
        {dataIndex === field.time ? (
          <div>{dayjs(record[dataIndex]).format(DATE_FORMAT.DD_MM_YYYY)}</div>
        ) : (
          <Fragment>{record[dataIndex]}</Fragment>
        )}
      </div>
      {!!colspans &&
        colspans.map((extraField: any) => {
          return (
            <Fragment>
              {dataIndex === extraField.colspan ? (
                <Typography
                  children={record[extraField.colspanValue]}
                  variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
                  customStyle={`${extraField.customStyle}? ${extraField.customStyle} :${styles.colSpan}`}
                />
              ) : null}
            </Fragment>
          );
        })}
    </div>
  );
};

export default TableCells;
