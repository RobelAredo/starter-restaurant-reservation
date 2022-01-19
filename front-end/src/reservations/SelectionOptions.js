import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { reserveTable } from "../utils/api";


export default function SelectionOptions ({tableList}) {

  const [selection, setSelection] = useState(1);
  const [selectionError, setSelectionError] = useState(null);

  const history = useHistory();
  const { reservation_id } = useParams();

  const options = tableList.map(table => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ))

  function submitHandler (event) {
    event.preventDefault();
    const ac = new AbortController();

    const reserveSelection = async () => {
      try {
        console.log(selection)
        await reserveTable(reservation_id, selection, ac.signal);
        history.push("/dashboard");
      } catch (error) {
        setSelectionError(error);
      }
    }

    reserveSelection();

    return () => ac.abort();
  }

  return (
    <>
      <ErrorAlert error={selectionError}/>
      <form onSubmit={submitHandler}>
        <label htmlFor="table">
          Select Your Table
          <br/>
          <select name="table_id" onChange={(event) => setSelection(+event.target.value)}>
            {options}
          </select>
        </label>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  )
}