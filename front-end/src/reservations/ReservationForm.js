import React from "react";

export function ReservationForm ({sumbitHandler, changeHandler, form, history}) {
  const style = {
    width:"100%",
  } 
  
  const btnStyle = {
    width:"46%",
  }

  return (
    <form onSubmit={sumbitHandler} className="col form bg-light mr-0 pr-0">
      <label className="mr-0 pr-0" htmlFor="first_name">
        First name
        <br />
        <input style={style}
        name="first_name" type="text" id="first_name"
        onChange={changeHandler} value={form.first_name} />
      </label>
      <br/>
      <label className="mr-0 pr-0" htmlFor="last_name">
        Last name
        <br />
        <input style={style} name="last_name" type="text" id="last_name"
        onChange={changeHandler} value={form.last_name} />
      </label>
      <br/>
      <label className="mr-0 pr-0" htmlFor="mobile_number">
        Phone number
        <br />
        <input style={style} name="mobile_number" type="tel" id="mobile_number"
        onChange={changeHandler} value={form.mobile_number}/>
      </label>
      <br/>
      <label className="mr-0 pr-0" htmlFor="reservation_date">
        Reservation date
        <br />
        <input style={style} name="reservation_date" type="date" id="reservation_date"
        onChange={changeHandler} value={form.reservation_date}/>
      </label>
      <br/>
      <label className="mr-0 pr-0" htmlFor="reservation_time">
        Reservation time
        <br />
        <input style={style} name="reservation_time" type="time" id="reservation_time"
        onChange={changeHandler} value={form.reservation_time}/>
      </label>
      <br/>
      <label className="mr-0 pr-0" htmlFor="people">
        Group size
        <br />
        <input style={style} name="people" type="number" id="people"
        onChange={changeHandler} value={form.people} />
      </label>
      <br/>
      <button style={btnStyle} name="submit" className="btn btn-warning font-weight-bold mr-3 mt-3" type="submit">
        Submit
      </button>
      <button style={btnStyle} name="cancel" className="btn btn-danger font-weight-bold mt-3" type="button"
      onClick={() => history.goBack()}>
        Cancel
      </button>
    </form>
  )
}