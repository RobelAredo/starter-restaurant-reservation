import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable } from "../utils/api";

export default function TablesTable ({tables}) {

  const [error, setError] = useState(null)

  function clickHandler (table) {
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      const ac = new AbortController();
      const finishOccupiedTable = async () => {
        try {
          await finishTable(table.table_id, ac.signal);
          window.location.reload(false);
        } catch (error) {
          setError(error);
        }
      }
      finishOccupiedTable();
      return () => ac.abort();
    }
  }

  const tableList = tables.map(table => (
    <tr key={table.table_id}>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      <td>
        {
          table.reservation_id 
            ? <button className="btn btn-warning" onClick={() => clickHandler(table)}
              data-table-id-finish={table.table_id}>
                FINISH
              </button> 
            : null
        }
      </td>
    </tr>
  ))

  return (
    <>
      <ErrorAlert error={error}/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Availability</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>
        <tbody>
          {tableList}
        </tbody>
      </table>
    </>
  )
}