import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";
import { useParams } from "react-router";
import { editReservation, findReservation } from "../../utils/api";
import { ReservationForm } from "../ReservationForm";
import formatReservationDate from "../../utils/format-reservation-date";
import formatReservationTime from "../../utils/format-reservation-time";
const img = require("../../images/chef.jpg").default;

export default function EditReservation () {
  const intialForm = {first_name: "", last_name: "", mobile_number: "", reservation_date: "", reservation_time: "", people: 1};
  const [form, setForm] = useState(intialForm);
  const [error, setError] = useState(null);
  const history = useHistory();

  const {reservation_id} = useParams();

  useEffect(loadReservation, [reservation_id]);

  function loadReservation () {
    const ac = new AbortController();
    
    const find = async () => {
      try {
        const reservation = await findReservation(reservation_id, ac.signal);
        setForm(formatReservationTime(formatReservationDate(reservation)));
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
    setError(null);
    const addReservation = async () => {
      try {
        await editReservation(form, ac.signal); 
        history.push(`/dashboard?date=${form.reservation_date}`);
      } catch (error) {
        setError(error);
      }
    }
    addReservation();
    return () => ac.abort();
  }

  return (
    <>
      <nav className="side-bar secondary py-3 px-0 mx-0">
        <h1 className="text-warning">Edit Reservation</h1>
      </nav>
      <div className="card-bg three">
        <ErrorAlert error={error} />
          <div className="card bg-light" style={{width:"70%"}}>
            <div className="row p-0 m-0">
              <div className="p-3 pr-5">
                <ReservationForm sumbitHandler={sumbitHandler} changeHandler={changeHandler} form={form} history={history} />
              </div>
              <div className="col p-0 m-0">
                <img className="card-img pop" src={img} alt="Card cap"/>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}