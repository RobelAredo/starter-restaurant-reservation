import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import CreateReservation from "../reservations/pages/CreateReservation";
import EditReservation from "../reservations/pages/EditReservation";
import CreateTable from "../tables/pages/CreateTable";
import TableSelection from "../tables/pages/TableSelection";
import SearchPage from "../reservations/pages/SearchPage";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <TableSelection />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact path="/tables/new">
        <CreateTable />
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
