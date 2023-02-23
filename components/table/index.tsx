import classes from "./table.module.scss";

const tableColumn: any = [
  {
    name: "fName",
  },

  {
    name: "lName",
  },
];

const tableBody: any = [
  {
    fName: "nikhil",
    lName: "ladage",
  },
  {
    fName: "amit",
    lName: "kumar",
  },
];

const Table = ({ styleClasses, sortByfilter }: any) => {

  return (
    <table className={classes.tableWrapper || styleClasses.tableWrapper}>
      <thead>
        <tr>
          {!!tableColumn?.length &&
            tableColumn.map((data: any, index: number) => (
              <th key={index} className={classes.tableHeadRowData}>
                {data.name}
                {sortByfilter || ""}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {!!tableBody?.length &&
          tableBody.map((rowData: string, index: number) => (
            <tr key={index}>
              {!!tableColumn?.length &&
                tableColumn.map((data: any, columnIndex: number) => (
                  <td key={columnIndex}>{rowData[data.name]}</td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  styleClasses: classes,
  sortByfilter: "",
};

export default Table;
