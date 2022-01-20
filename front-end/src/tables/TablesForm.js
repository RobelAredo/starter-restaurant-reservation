import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

export default function TableForm () {
  const initialForm = { table_name: "", capacity: ""}
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const history = useHistory();

  function changeHandler ({target}) {
    setForm({...form, [target.name]: +target.value? +target.value : target.value})
  }

  function submitHandler (event) {
    event.preventDefault();
    const ac = new AbortController();

    const addTable = async () => {
      try {
        // setForm((submission) => ({...submission, capacity: +submission.capacity}));
        await createTable(form, ac.siganl);
        
        setForm(initialForm);
        setError(null);
        history.push("/dashboard");
      } catch (error) {
        setError(error);
      }
    }

    addTable();
    return () => ac.abort();
  }
  
  return (
    <>
      <br/>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <label htmlFor="table_name">
          Table Name:
          <input name="table_name" id="table_name" type="text" 
          pattern=".{2,}" onChange={changeHandler} value={form.table_name}/>
        </label>
        <label htmlFor="capacity">
          Capacity:
          <input name="capacity" id="capacity" type="number"
          onChange={changeHandler} value={form.capacity}/>
        </label>
        <br/>
        <button name="submit" className="btn btn-primary" type="submit">
          Submit
        </button>
        <button name="button" className="btn btn-danger" type="button"
        onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </>
  )
}