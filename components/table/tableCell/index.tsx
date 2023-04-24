import React, { Fragment, ReactNode } from "react";
import dayjs from "dayjs";
import styles from "./tableCell.module.scss";
import { DATE_FORMAT } from "@/common/constants";
import { IExtraField, ITable } from "./tablecell.types";
import Typography from "../../typography/index";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";

 const TableCell  = (props: ITable) => {
  const { dataIndex, record, field, additionalValue,dataFormatType } = props;
  console.log(dataFormatType)
  return (
    <div className={styles.table}>
      <div>
        {dataIndex === field.time ? (
          <div>{dayjs(record[dataIndex]).format(dataFormatType)}</div>
        ) : 
        (
          <Fragment>{record[dataIndex]}</Fragment>
        )}
      </div>
      {!!additionalValue &&
        additionalValue.map((extraField:IExtraField) => {
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
export default TableCell