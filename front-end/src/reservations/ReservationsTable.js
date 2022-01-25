import React from "react";
import ReservationRowDisplay from "./ReservationRowDisplay";

export default function ReservationsTable ({ reservations, all, setReservationsError}) {

  const reservationList = reservations.map(reservation => (
    <tr key={reservation.reservation_id}>
      <ReservationRowDisplay reservation={reservation} all={all} setReservationsError={setReservationsError} />
    </tr>
  ))

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Name</th>
          <th scope="col">Group&nbsp;Size</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {reservationList}
      </tbody>
    </table>
  )
}