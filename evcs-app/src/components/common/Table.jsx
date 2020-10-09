import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';


const Table = ({ columns, data, className}) => {
  return (
    <table className={`table ${className}`}>
      <TableHeader
        columns={columns} />
      <TableBody
        data={data}
        columns={columns} />
    </table>
  );
}

export default Table;