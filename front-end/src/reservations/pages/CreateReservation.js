import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";
import { createReservation } from "../../utils/api";
import { ReservationForm } from "../ReservationForm";
const img = require("../../images/pexels-andrea-piacquadio.jpg").default;

export default function CreateReservation () {
  const intialForm = {first_name: "", last_name: "", mobile_number: "", reservation_date: "", reservation_time: "", people: 1};
  const [form, setForm] = useState(intialForm);
  const [error, setError] = useState(null);
  const history = useHistory();

  function changeHandler ({target}) {
    setForm(form => ({...form, [target.name] : +target.value? +target.value : target.value}));
  }

  function sumbitHandler (event) {
    event.preventDefault();
    const ac = new AbortController();
    setError(null);
    const addReservation = async () => {
      try {
        await createReservation(form, ac.signal);
        
        history.push(`/dashboard?date=${form.reservation_date}`);
        setForm({...intialForm});
      } catch (error) {
        setError(error);
      }
    }
    addReservation();
    return () => ac.abort();
  }

  return (
    <>
      <nav className="side-bar py-3">
        <h1 className="text-warning">Create Reservation</h1>
      </nav>
      <ErrorAlert error={error} />
      <div className="card p-0 m-5" style={{width:"70%"}}>
        <div className="row p-0 m-0">
          <div className="bg-light p-3 pr-5">
            <ReservationForm sumbitHandler={sumbitHandler} changeHandler={changeHandler} form={form} history={history} />
          </div>
          <div className="col p-0 m-0">
            <img className="card-img pop" src={img} alt="Card cap"/>
          </div>
        </div>
    </div>
    </>
  )
}