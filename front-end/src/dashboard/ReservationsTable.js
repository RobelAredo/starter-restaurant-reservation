import React from "react";
import ReservationRowDisplay from "./ReservationRowDisplay";

export default function ReservationsTable ({ reservations, all }) {

  const reservationList = reservations.map(reservation => (
    <ReservationRowDisplay reservation={reservation} all={all}/>
  ))

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Name</th>
          <th scope="col">Group Size</th>
          <th scope="col">Status</th>
          <th scope="col">Seating</th>
        </tr>
      </thead>
      <tbody>
        {reservationList}
      </tbody>
    </table>
  )
}