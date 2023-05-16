import Table from "rc-table";
import styles from "./table.module.scss";
import { IHandleRowSelect, ITableComponent } from "./table.types";
import {
  checkIdeal,
  checkMaster,
  checkRow,
  handleAllRowSelect,
  toCamelCase,
} from "@/common/utils";
import { SORT_TYPE, TABLE_CONSTANTS } from "@/common/constants";
import CustomCheckBox from "../customCheckBox";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import ImageComponent from "@/components/imageComponent";
import { Column } from "rc-table";
import Images from "@/public/assets/icons";
import TableCell from "./tableCell";
import { Fragment, useCallback } from "react";
import { IData, IHeaderTitleProps } from "@/pages/candidates/candidates.types";
import Loader from "../loader";

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
    handleRowEachSelect,
    hoverCell,
  } = props;
  const {
    upArrowDisabled,
    upArrowEnabled,
    downArrowDisabled,
    downArrowEnabled,
  } = Images;
  const handleCheckBoxClicks = useCallback(
    (id: number) => () => {
      !!handleCheckBoxClick && handleCheckBoxClick(id);
    },
    [selectedRow]
  );

  const handleAscendingArrowClick = useCallback(
    (dataIndex: string, data: IData) => () => {
      !!handleSortArrowClick &&
        handleSortArrowClick(dataIndex, SORT_TYPE.ASCENDING, data);
    },
    [buttonState]
  );
  const handleDescendingArrowClick = useCallback(
    (dataIndex: string, data: IData) => () => {
      !!handleSortArrowClick &&
        handleSortArrowClick(dataIndex, SORT_TYPE.DESCENDING, data);
    },
    [buttonState]
  );
  const handleAllRowSelects = useCallback(
    (data: IData[], selectedRow: number[], handleRowSelect: IHandleRowSelect) =>
      () => {
        handleAllRowSelect(data, selectedRow, handleRowSelect);
      },
    [data, selectedRow, handleAllRowSelect]
  );
  const handleCheckBoxClick = (id: number) => {
    const updatedRows = !!selectedRow
      ? selectedRow?.includes(id)
        ? selectedRow.filter((row) => row !== id)
        : [...selectedRow, id]
      : [];
    !!selectedRow &&
      !!handleRowEachSelect &&
      handleRowSelect &&
      handleRowEachSelect(id, updatedRows, handleRowSelect);
  };

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
                    children={column.title}
                    customStyle={styles.title}
                  />
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
              ) : (
                <TableCell
                  dataIndex={dataIndex as string}
                  data={data}
                  field={fieldforDateFormat}
                  additionalValue={additionalValue && additionalValue}
                  dataFormatType={dataFormatType}
                  index={index}
                  hoverCell={hoverCell}
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
