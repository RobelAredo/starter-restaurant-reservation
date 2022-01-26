import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";
import { createTable } from "../../utils/api";
import { TableForm } from "../TableForm";
const img = require("../../images/the-periodic-table.jpg").default;


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

    setError(null);
    const addTable = async () => {
      try {
        await createTable(form, ac.siganl);
        
        setForm(initialForm);
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
    <nav className="side-bar secondary py-3 px-0 mx-0">
      <h1 className="text-warning">Create Table</h1>
    </nav>
    <ErrorAlert error={error} />
    <div className="card-bg two">
      <div className="card bg-light" style={{width:"90%"}}>
        <div className="">
          <div className="p-3">
          <TableForm submitHandler={submitHandler} changeHandler={changeHandler} form={form} history={history} />
          </div>
          <img className="card-img table"  src={img} alt="Card cap"/>
        </div>
      </div>
    </div>
  </>
  )
}