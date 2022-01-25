import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";
import { createTable } from "../../utils/api";
import { TableForm } from "../TableForm";

export default function CreateTable () {
  const initialForm = { table_name: "", capacity: ""}
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const history = useHistory();

  function changeHandler ({target}) {
    setForm({...form, [target.name]: +target.value? +target.value : target.value});
  }

  function submitHandler (event) {
    event.preventDefault();
    const ac = new AbortController();

    const addTable = async () => {
      try {
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
      <TableForm submitHandler={submitHandler} changeHandler={changeHandler} form={form} history={history} />
    </>
  )
}