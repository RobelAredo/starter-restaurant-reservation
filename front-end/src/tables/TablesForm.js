import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

export default function TableForm () {
  const initialForm = { table_name: "", capacity: 1}
  const [form, setForm] = useState(initialForm);

  const history = useHistory();

  function changeHandler ({target}) {
    setForm({...form, [target.name]: target.value})
  }

  function submitHandler (event) {
    event.preventDefault();
    const ac = new AbortController();

    const addTable = async () => {
      setForm({...form, capacity: +form.capacity});
      await createTable(form, ac.siganl);
      setForm(initialForm);
      history.push("/dashboard");
    }

    addTable();
    return () => ac.abort();
  }
  
  return (
    <>
      <br/>
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