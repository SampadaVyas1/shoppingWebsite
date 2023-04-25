import Table from "rc-table";
import styles from "./table.module.scss";
import {
  IHeaderTitleProps,
  IRecordProps,
  ITableComponent,
} from "./table.types";
import { toCamelCase } from "@/common/utils";
import { TABLE_CONSTANTS } from "@/common/constants";
import CustomCheckBox from "../customCheckBox";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import ImageComponent from "@/components/image";
import { Column } from "rc-table";
import Images from "@/public/assets/icons";
import TableCell from "./tableCell";

export const TableComponent = (props: ITableComponent) => {
  const {
    data,
    columnHeaderTitle,
    additionalValue,
    fieldforDateFormat,
    dataFormatType,
    customStyle,
    customRowStyling,
  } = props;
  const {
    upArrowDisabled,
    upArrowEnabled,
    downArrowDisabled,
    downArrowEnabled,
  } = Images;

  const generateColumns = (columnHeaderTitle: IHeaderTitleProps[]) => {
    return (
      !!columnHeaderTitle &&
      columnHeaderTitle
        ?.map((column: IHeaderTitleProps) => {
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
                  <TableCell
                    dataIndex={dataIndex}
                    record={record}
                    field={fieldforDateFormat}
                    additionalValue={additionalValue}
                    dataFormatType={dataFormatType}
                  />
                )
              }
            />
          );
        })
    );
  };

  return (
    <Table
      data={!!data && data}
      className={styles.rcTable}
      components={customStyle}
      rowClassName={customRowStyling}
    >
      {generateColumns(columnHeaderTitle)}
    </Table>
  );
};
