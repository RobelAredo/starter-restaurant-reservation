import React from "react";
import { useHistory } from "react-router";

export default function ReservationTable ({ reservations }) {

  const history = useHistory();

  const reservationList = reservations.map(({first_name, last_name, reservation_time, people, reservation_id}) => (
    <tr key={reservation_id}>
      <td>{reservation_time}</td>
      <td>{first_name} {last_name}</td>
      <td>{people}</td>
      <td>
        <button className="btn btn-info" name="seat"
        onClick={() => history.push(`/reservations/${reservation_id}/seat`)}>
          SEAT
        </button></td>
    </tr>
  ))

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Name</th>
          <th scope="col">Group Size</th>
          <th scope="col">Seating</th>
          
        </tr>
      </thead>
      <tbody>
        {reservationList}
      </tbody>
    </table>
  )
}