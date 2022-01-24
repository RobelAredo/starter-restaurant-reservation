import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "./ReservationsTable";
import TablesTable from "./TablesTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  
  const history = useHistory();
  const dateQuery = useLocation().search.split("=")
  date = dateQuery && dateQuery[0].match(/\?date/) ? dateQuery[1] : date;
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const ac1 = new AbortController();
    const ac2 = new AbortController();
    setReservationsError(null);
    setTablesError(null);

    listReservations({ date }, ac1.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(ac2.signal)
      .then(setTables)
      .catch(setTablesError);
    
    return () => ac1.abort() && ac2.abort();
  }

  console.log(reservations)

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col col-6">
        <div className="btn btn-group pl-0" type="group">
          <button type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)} className="btn btn-primary">Previous</button>
          <button type="button" onClick={() => history.push(`/dashboard?date=${next(date)}`)} className="btn btn-primary">Next</button>
          <button type="button" onClick={() => history.push(`/dashboard`)} className="btn btn-primary">Today</button>
        </div>
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <ErrorAlert error={reservationsError} />
          <ReservationsTable reservations={reservations} setReservationsError={setReservationsError}/>
        </div>
        <div className="col col-6">
          <h4>Tables availble</h4>
          <ErrorAlert error={tablesError} />
          <TablesTable tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
