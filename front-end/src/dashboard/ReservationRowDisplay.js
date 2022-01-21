import React from "react";

export default function ReservationRowDisplay ({reservation, all}) {
  console.log("NOT DISPLAy", all);
  
  return reservation.status === "finished" && !all
    ? null
    : (
      <tr key={reservation.reservation_id}>
        <td key="01">{reservation.reservation_time}</td>
        <td key="02">{reservation.first_name} {reservation.last_name}</td>
        <td key="03">{reservation.people}</td>
        <td key="04"data-reservation-id-status={`${reservation.reservation_id}`}>
          {reservation.status}
        </td>
        <td key="05">
          {
            reservation.status === "booked"
            ? <a className="btn btn-info" name="seat" href={`/reservations/${reservation.reservation_id}/seat`}>SEAT</a>
            : null
          }
        </td>
      </tr>
    )
}