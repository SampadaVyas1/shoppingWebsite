import React, { Fragment, ReactNode } from "react";
import dayjs from "dayjs";
import styles from "./tableCell.module.scss";
import { IExtraField, ITable } from "./tableCell.types";
import Typography from "../../typography/index";
import ImageComponent from "../../image/index"
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import Images from "@/public/assets/icons";

 const TableCell  = (props: ITable) => {
  const { dataIndex, record, field, additionalValue,dataFormatType } = props;
  return (
    <div className={styles.table}>
      <div>
        {!!field && dataIndex === field.time ? (
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}>{dayjs(record[dataIndex]).format(dataFormatType)}</Typography>
        ) : 
        (
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}>{record[dataIndex]}</Typography>
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