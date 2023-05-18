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

import ImageComponent from "../imageComponent";
import {
  handleAllRowSelect,
  checkIdeal,
  checkMaster,
  checkRow,
} from "@/common/utils";

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
        const dataIndex = column.dataIndex;
        return (
          <Column
            title={
              <div className={styles.header}>
                {column.title === TABLE_CONSTANTS.CHECKBOX ? (
                  <CustomCheckBox
                    ideal={!!selectedRow && checkIdeal(selectedRow, data)}
                    checked={!!selectedRow && checkMaster(selectedRow, data)}
                    handleClick={
                      selectedRow &&
                      handleRowSelect &&
                      handleAllRowSelects(data, selectedRow, handleRowSelect)
                    }
                  />
                ) : (
                  <Typography
                    variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
                    customStyle={styles.title}
                  >
                    {column.title}
                  </Typography>
                )}
                {!!column.sort && (
                  <div className={styles.sortIcon}>
                    <ImageComponent
                      src={
                        !!buttonState && buttonState[dataIndex]?.upKeyDisabled
                          ? upArrowDisabled
                          : upArrowEnabled
                      }
                      width={10}
                      height={10}
                      onClick={
                        data && handleAscendingArrowClick(dataIndex, data)
                      }
                      className={styles.ascendingicon}
                    />
                    <ImageComponent
                      src={
                        !!buttonState &&
                        buttonState[dataIndex as string]?.downKeyDisabled
                          ? downArrowDisabled
                          : downArrowEnabled
                      }
                      width={10}
                      height={10}
                      onClick={
                        data &&
                        handleDescendingArrowClick(dataIndex as string, data)
                      }
                      className={styles.ascendingicon}
                    />
                  </div>
                )}
              </div>
            }
            dataIndex={dataIndex as string}
            key={column.key as string}
            render={(text: string, record: IData, index: number) =>
              column.title == TABLE_CONSTANTS.CHECKBOX ? (
                <CustomCheckBox
                  id={data[index][TABLE_CONSTANTS.ID]}
                  handleClick={handleCheckBoxClicks(
                    data[index][TABLE_CONSTANTS.ID]
                  )}
                  checked={
                    selectedRow &&
                    checkRow(data[index][TABLE_CONSTANTS.ID], selectedRow)
                  }
                  customClass={styles.checkBoxStyling}
                />
              ) : !isLoading ? (
                <TableCell
                  dataIndex={dataIndex as string}
                  data={data}
                  showToggle={showToggle}
                  onSwitchToggle={onSwitchToggle}
                  field={fieldforDateFormat}
                  additionalValue={additionalValue && additionalValue}
                  dataFormatType={dataFormatType}
                  index={index}
                  hoverCell={hoverCell}
                />
              ) : (
                <SkeletonLoader
                  type={SKELETON_VARIANT.TEXT_LARGE}
                  customClass={styles.cellLoader}
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
