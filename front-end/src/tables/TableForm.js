import React from "react";

export function TableForm ({submitHandler, changeHandler, form, history}) {
  return (
    <form className="form table" onSubmit={submitHandler}>
      <div className="inputs">
        <label className="mr-3 mb-0" htmlFor="table_name">
          Table Name
          <input name="table_name" id="table_name" type="text" 
          pattern=".{2,}" onChange={changeHandler} value={form.table_name}/>
        </label>
        <label className="mb-0" htmlFor="capacity">
          Capacity
          <input name="capacity" id="capacity" type="number"
          onChange={changeHandler} value={form.capacity}/>
        </label>
      </div>
      <div className="buttons mt-3">
        <button name="submit" className="btn btn-warning font-weight-bold mx-3" type="submit">
          Submit
        </button>
        <button name="button" className="btn btn-danger font-weight-bold" type="button"
        onClick={() => history.goBack()}>
          Cancel
        </button>
      </div>
    </form>
  )
}