import React from "react";

export function TableForm ({submitHandler, changeHandler, form, history}) {
  return (
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
  )
}