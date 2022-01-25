import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";
import { ReservationForm } from "./ReservationForm";

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
      <br/>
      <ErrorAlert error={error} />
      <ReservationForm sumbitHandler={sumbitHandler} changeHandler={changeHandler} form={form} history={history} />
    </>
  )
}