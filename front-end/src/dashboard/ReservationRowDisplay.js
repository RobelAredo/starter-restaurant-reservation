import React from "react";

export default function ReservationRowDisplay ({reservation}) {
  return reservation.status === "finished"
    ? null
    : (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.first_name} {reservation.last_name}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={`${reservation.reservation_id}`}>
          {reservation.status}
        </td>
        <td>
          {
            reservation.status === "booked"
            ? <a className="btn btn-info" name="seat" href={`/reservations/${reservation.reservation_id}/seat`}>SEAT</a>
            : null
          }
        </td>
      </tr>
    )
}