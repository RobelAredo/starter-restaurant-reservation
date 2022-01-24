import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router";
import { editReservation, findReservation } from "../utils/api";
import { ReservationForm } from "./ReservationForm";

export default function EditReservation () {
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const history = useHistory();

  const {reservation_id} = useParams();

  useEffect(loadReservation, []);

  function loadReservation () {
    const ac = new AbortController();
    
    console.log("HEHEHEHEHEHE EDIT RESERVATION")
    const find = async () => {
      try {
        const reservation = await findReservation(reservation_id, ac.signal);
        setForm({...reservation});
      } catch (error) {
        setError(error);
      }
    }
    find();
    return () => ac.abort();
  }

  function changeHandler ({target}) {
    setForm(form => ({...form, [target.name] : +target.value? +target.value : target.value}));
  }

  function sumbitHandler (event) {
    event.preventDefault();
    const ac = new AbortController();
    const addReservation = async () => {
    setError(null);
      try {
        await editReservation(form, ac.signal);        
        history.goBack();
      } catch (error) {
        setError(error);
      }
    }
    addReservation();
    return () => ac.abort();
  }

  console.log(form)
  return (
    <>
      <br/>
      <ErrorAlert error={error} />
      <ReservationForm sumbitHandler={sumbitHandler} changeHandler={changeHandler} form={form} history={history} />
    </>
  )
}