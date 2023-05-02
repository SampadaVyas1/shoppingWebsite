import React, { Fragment, ReactNode } from "react";
import dayjs from "dayjs";
import styles from "./tableCell.module.scss";
import { IExtraField, ITable } from "./tableCell.types";
import Typography from "../../typography/index";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";

const TableCell = (props: ITable) => {
  const { dataIndex, data, field, additionalValue, dataFormatType, index } =
    props;
  return (
    <div className={styles.table}>
      <div>
        {!!field && dataIndex === field.time ? (
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}>
            {dayjs(data[index][dataIndex]).format(dataFormatType)}
          </Typography>
        ) : (
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}>
            {data[index][dataIndex]}
          </Typography>
        )}
      </div>
      {!!additionalValue &&
        additionalValue.map((extraField: IExtraField) => {
          return (
            <Fragment>
              {dataIndex === extraField.colspan ? (
                <Typography
                  children={data[index][extraField.colspanValue]}
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
export default TableCell;
