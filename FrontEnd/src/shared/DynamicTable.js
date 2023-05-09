import "../styleShared/Table.css";

const DynamicTable = (TableData, type) => {
  // get table column
  const column = Object.keys(TableData[0]);
  // get table heading data
  const ThData = () => {
    return column.map((data) => {
      return (
        <th key={data} className="shared-th">
          {data}
        </th>
      );
    });
  };
  // get table row data
  const tdData = () => {
    let x = 0;
    return TableData.map((data) => {
      return (
        <tr key={x++}>
          {column.map((v) => {
            return (
              <td key={x++} className="shared-td">
                {data[v]}
              </td>
            );
          })}
        </tr>
      );
    });
  };
  return (
    <section className="sec">
      <div id="shared-table-p">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <table className="shared-table" id="myTable">
        <thead>
          <tr className="shared-tr">{ThData()}</tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </table>
    </section>
  );
};

export default DynamicTable;
