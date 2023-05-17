import React, { Fragment, ReactNode } from "react";
import dayjs from "dayjs";
import styles from "./tableCell.module.scss";
import { IExtraField, ITable } from "./tableCell.types";
import Typography from "../../typography/index";
import { TOOLTIP_POSITION, TYPOGRAPHY_VARIANT } from "@/common/enums";
import Tooltip from "@/components/tooltip";

const TableCell = (props: ITable) => {
  const {
    dataIndex,
    data,
    field,
    additionalValue,
    dataFormatType,
    index,
    hoverCell,
  } = props;
  const getHoverTooltip = (data: any, index: number, dataIndex: string) => (
    <div>
      {!!data[index][dataIndex]?.length &&
        data[index][dataIndex]?.map((item: string, i: number) => {
          const isLastItem = i === data[index][dataIndex].length - 1;
          if (i < 2) {
            return (
              <Fragment key={i}>
                <span>
                  {item}
                  {isLastItem ? "" : ", "}
                </span>
              </Fragment>
            );
          } else if (i === 2 && data[index][dataIndex].length > 2) {
            return (
              <Fragment key={i}>
                <span>+{data[index][dataIndex].length - 2}</span>
              </Fragment>
            );
          } else {
            return null;
          }
        })}
    </div>
  );

  return (
    <div className={styles.table}>
      <div>
        {!!field && dataIndex === field.time ? (
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}>
            {dayjs(data[index][dataIndex]).format(dataFormatType)}
          </Typography>
        ) : dataIndex === hoverCell ? (
          data[index][dataIndex]?.length > 2 ? (
            <div className={styles.tooltip}>
              <Tooltip
                position={TOOLTIP_POSITION.BOTTOM}
                content={
                  <Fragment>
                    {data[index][dataIndex].map((item: string, i: number) =>
                      i === data[index][dataIndex].length - 1
                        ? ` & ${item}`
                        : i === data[index][dataIndex].length - 2
                        ? `${item}`
                        : `${item}, `
                    )}
                  </Fragment>
                }
                customStyle={styles.tooltipCustomStyle}
              >
                {getHoverTooltip(data, index, dataIndex)}
              </Tooltip>
            </div>
          ) : (
            <>{getHoverTooltip(data, index, dataIndex)}</>
          )
        ) : (
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_REGULAR}>
            {data[index][dataIndex]}
          </Typography>
        )}
      </div>
      {!!additionalValue &&
        additionalValue.map((extraField: IExtraField, index: number) => {
          return (
            <Fragment key={index}>
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
