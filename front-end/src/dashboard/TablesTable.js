import React from "react";

export default function TablesTable ({tables}) {

  const tableList = tables.map(table => (
    <tr key={table.table_id}>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td>{table.reservation_id ? "Occupied" : "Free"}</td>
    </tr>
  ))

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Table</th>
          <th scope="col">Capacity</th>
          <th scoper="col">Availability</th>
        </tr>
      </thead>
      <tbody>
        {tableList}
      </tbody>
    </table>
  )
}