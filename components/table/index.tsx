import React, { Fragment, ReactNode } from "react";
import dayjs from "dayjs";
import styles from "./table.module.scss";
import { DATE_FORMAT } from "@/common/constants";
import { IExtraField, ITable } from "./table.types";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";

export const Table  = (props: ITable) => {
  const { dataIndex, record, field, colspans } = props;
  return (
    <div className={styles.table}>
      <div>
        {dataIndex === field.time ? (
          <div>{dayjs(record[dataIndex]).format(DATE_FORMAT.DD_MM_YYYY)}</div>
        ) : (
          <Fragment>{record[dataIndex]}</Fragment>
        )}
      </div>
      {!!colspans &&
        colspans.map((extraField:IExtraField) => {
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

