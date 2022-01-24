import React from "react";

export function ReservationForm ({sumbitHandler, changeHandler, form, history}) {
  return (
    <form onSubmit={sumbitHandler} className="form">
      <label htmlFor="first_name">
        First name:
        <input name="first_name" type="text" id="first_name"
        onChange={changeHandler} value={form.first_name} />
      </label>  
      <label htmlFor="last_name">
        Last name:
        <input name="last_name" type="text" id="last_name"
        onChange={changeHandler} value={form.last_name} />
      </label>
      <label htmlFor="mobile_number">
        Phone number:
        <input name="mobile_number" type="tel" id="mobile_number"
        onChange={changeHandler} value={form.mobile_number}/>
      </label>
      <label htmlFor="reservation_date">
        Reservation date:
        <input name="reservation_date" type="date" id="reservation_date"
        onChange={changeHandler} value={form.reservation_date}/>
      </label>
      <label htmlFor="reservation_time">
        Reservation time:
        <input name="reservation_time" type="time" id="reservation_time"
        onChange={changeHandler} value={form.reservation_time}/>
      </label>
      <label htmlFor="people">
        Group size:
        <input name="people" type="number" id="people"
        onChange={changeHandler} value={form.people} />
      </label>
      <button name="submit" className="btn btn-primary" type="submit">
        Submit
      </button>
      <button name="cancel" className="btn btn-danger" type="button"
      onClick={() => history.goBack()}>
        cancel
      </button>
    </form>
  )
}