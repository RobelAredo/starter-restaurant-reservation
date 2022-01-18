import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "./ReservationsTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  
  const history = useHistory();
  const dateQuery = useLocation().search.split("=")
  date = dateQuery && dateQuery[0].match(/\?date/) ? dateQuery[1] : date;
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="btn btn-group" type="group">
        <button type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)} className="btn btn-primary">Previous</button>
        <button type="button" onClick={() => history.push(`/dashboard?date=${next(date)}`)} className="btn btn-primary">Next</button>
        <button type="button" onClick={() => history.push(`/dashboard`)} className="btn btn-primary">Today</button>
      </div>
      <ReservationTable reservations={reservations} date={date}/>
    </main>
  );
}

export default Dashboard;
