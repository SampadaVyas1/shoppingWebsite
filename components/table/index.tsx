import Table from "rc-table";
import styles from "./table.module.scss";
import { IHandleRowSelect, ITableComponent } from "./table.types";
import { SORT_TYPE, TABLE_CONSTANTS } from "@/common/constants";
import CustomCheckBox from "../customCheckBox";
import Typography from "../typography";
import { Column } from "rc-table";
import Images from "@/public/assets/icons";
import TableCell from "./tableCell";
import { Fragment, useCallback } from "react";
import { IData, IHeaderTitleProps } from "@/common/types/candidates.types";
import Loader from "../loader";
import SkeletonLoader from "../skeletonLoader";
import { TYPOGRAPHY_VARIANT, SKELETON_VARIANT } from "@/common/types/enums";
import { handleAllRowSelect, toCamelCase } from "@/common/utils";
import ImageComponent from "../imageComponent";

export const TableComponent = (props: ITableComponent) => {
  const {
    data,
    loading,
    columnHeaderTitle,
    additionalValue,
    fieldforDateFormat,
    dataFormatType,
    customStyle,
    customRowStyling,
    buttonState,
    handleSortArrowClick,
    selectedRow,
    handleRowSelect,
    showToggle,
    handleRowEachSelect,
    hoverCell,
    onSwitchToggle,
    isLoading,
  } = props;
  const {
    upArrowDisabled,
    upArrowEnabled,
    downArrowDisabled,
    downArrowEnabled,
  } = Images;

  const handleCheckBoxClick = useCallback(
    (id: number) => {
      !!selectedRow &&
        !!handleRowEachSelect &&
        handleRowSelect &&
        handleRowEachSelect(id, selectedRow, handleRowSelect);
    },
    [handleRowEachSelect, handleRowSelect, selectedRow]
  );

  const handleCheckBoxClicks = useCallback(
    (id: number) => () => {
      !!handleCheckBoxClick && handleCheckBoxClick(id);
    },
    [handleCheckBoxClick]
  );

  const handleAscendingArrowClick = useCallback(
    (dataIndex: string, data: any) => () => {
      !!handleSortArrowClick &&
        handleSortArrowClick(dataIndex, SORT_TYPE.ASCENDING, data);
    },
    [handleSortArrowClick]
  );
  const handleDescendingArrowClick = useCallback(
    (dataIndex: string, data: any) => () => {
      !!handleSortArrowClick &&
        handleSortArrowClick(dataIndex, SORT_TYPE.DESCENDING, data);
    },
    [handleSortArrowClick]
  );
  const handleAllRowSelects = useCallback(
    (data: IData[], selectedRow: number[], handleRowSelect: IHandleRowSelect) =>
      () => {
        handleAllRowSelect(data, selectedRow, handleRowSelect);
      },
    []
  );

  const generateColumns = (columnHeaderTitle: IHeaderTitleProps[]) => {
    return (
      !!columnHeaderTitle &&
      columnHeaderTitle?.map((column: IHeaderTitleProps) => {
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
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Table
          data={!!data && data}
          emptyText=""
          className={styles.rcTable}
          components={customStyle}
          rowClassName={customRowStyling}
        >
          {generateColumns(columnHeaderTitle)}
        </Table>
      )}
    </Fragment>
  );
};
