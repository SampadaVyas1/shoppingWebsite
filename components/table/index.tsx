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
import { TABLE_CONSTANTS } from "@/common/constants";
import CustomCheckBox from "../customCheckBox";
import Typography from "../typography";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import ImageComponent from "@/components/image";
import { Column } from "rc-table";
import Images from "@/public/assets/icons";
import TableCell from "./tableCell";
import { useCallback } from "react";
import { IData, IHeaderTitleProps } from "@/pages/candidates/candidates.types";

export const TableComponent = (props: ITableComponent) => {
  const {
    data,
    columnHeaderTitle,
    additionalValue,
    fieldforDateFormat,
    dataFormatType,
    customStyle,
    customRowStyling,
    buttonState,
    handleUpArrowClick,
    handleDownArrowClick,
    selectedRow,
    handleRowSelect,
    handleCheckBoxClick,
  } = props;
  const {
    upArrowDisabled,
    upArrowEnabled,
    downArrowDisabled,
    downArrowEnabled,
  } = Images;
  const handleAscendingArrowClick = useCallback(
    (dataIndex: string) => () => {
      !!handleUpArrowClick && handleUpArrowClick(dataIndex);
    },
    [buttonState]
  );
  const handleDescendingArrowClick = useCallback(
    (dataIndex: string) => () => {
      !!handleDownArrowClick && handleDownArrowClick(dataIndex);
    },
    [buttonState]
  );
  console.log(handleRowSelect);
  const handleAllRowSelects = useCallback(
    (data: IData[], selectedRow: number[], handleRowSelect: IHandleRowSelect) =>
      () => {
        handleAllRowSelect(data, selectedRow, handleRowSelect);
      },
    [data, selectedRow, handleAllRowSelect]
  );
  const handleCheckBoxClicks = useCallback(
    (id: number) => () => {
      !!handleCheckBoxClick && handleCheckBoxClick(id);
    },
    [selectedRow]
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
                  <CustomCheckBox
                    ideal={checkIdeal(selectedRow, data)}
                    checked={checkMaster(selectedRow, data)}
                    handleClick={handleAllRowSelects(
                      data,
                      selectedRow,
                      handleRowSelect
                    )}
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
                        !!buttonState && buttonState[dataIndex].upKeyDisabled
                          ? upArrowDisabled
                          : upArrowEnabled
                      }
                      width={10}
                      height={10}
                      onClick={handleAscendingArrowClick(dataIndex)}
                      className={styles.ascendingicon}
                    />
                    <ImageComponent
                      src={
                        !!buttonState && buttonState[dataIndex].downKeyDisabled
                          ? downArrowDisabled
                          : downArrowEnabled
                      }
                      width={10}
                      height={10}
                      onClick={handleDescendingArrowClick(dataIndex)}
                      className={styles.ascendingicon}
                    />
                  </div>
                )}
              </div>
            }
            dataIndex={dataIndex}
            key={dataIndex}
            render={(text: string, record: IData, index: number) =>
              column.title == TABLE_CONSTANTS.CHECKBOX ? (
                <CustomCheckBox
                  id={data[index][TABLE_CONSTANTS.ID]}
                  handleClick={handleCheckBoxClicks(
                    data[index][TABLE_CONSTANTS.ID]
                  )}
                  checked={checkRow(
                    data[index][TABLE_CONSTANTS.ID],
                    selectedRow
                  )}
                  customClass={styles.checkBoxStyling}
                />
              ) : (
                <TableCell
                  dataIndex={dataIndex}
                  data={data}
                  field={fieldforDateFormat}
                  additionalValue={additionalValue}
                  dataFormatType={dataFormatType}
                  index={index}
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
