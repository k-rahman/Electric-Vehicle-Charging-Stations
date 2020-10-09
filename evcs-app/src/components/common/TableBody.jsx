import React from 'react';

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    for (let i in item) {
      if (i === column.path) {
        if (column.formateDate) return column.formateDate(item[i]);
        if (column.suffix) return column.suffix(item[i]);
        if (column.prefix) return column.prefix(item[i]);
        return item[i];
      }
    }
  };

  const createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map(item =>
        <tr key={item.id}>
          {columns.map(column =>
            <td key={createKey(item, column)}>
              {renderCell(item, column)}</td>)}</tr>)}
    </tbody>
  );
};

export default TableBody;