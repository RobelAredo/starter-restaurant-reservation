import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "../reservations/ReservationsTable";
import TablesTable from "../tables/TablesTable";
const italian = require("../images/italian-cuisine.jpg").default;


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

  return (
    <main>
      <div className="jumbotron jumbotron-fluid mb-0">
        <div className="container">
          <h1 className="display-1 text-warning">Dashboard</h1>
        <div className="col px-0">
          <div className="btn btn-group pl-0" type="group">
            <button type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)} className="btn btn-warning font-weight-bold">Previous</button>
            <button type="button" onClick={() => history.push(`/dashboard?date=${next(date)}`)} className="btn btn-warning font-weight-bold">Next</button>
            <button type="button" onClick={() => history.push(`/dashboard`)} className="btn btn-warning font-weight-bold">Today</button>
          </div>
        </div>
        </div>
      </div>
      <div className="dashboard-container row bg-light ml-0">
        <div className="col m-0 px-0">
          <div className="d-md-flex py-3 pl-3 bg-warning">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <ErrorAlert error={reservationsError} />
          <ReservationsTable reservations={reservations} setReservationsError={setReservationsError}/>
        </div>
        <div className="col m-0 px-0">
          <div className="d-md-flex py-3 pl-3 bg-warning">
            <h4 className="mb-0">Tables Available</h4>
          </div>
          <ErrorAlert error={tablesError} />
          <TablesTable tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
