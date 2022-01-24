import React from "react";
import { changeStatus } from "../utils/api";

export default function ReservationRowDisplay ({reservation, all, setReservationsError}) {

  function cancelHandler (reservation_id) {
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
      const ac = new AbortController();
      setReservationsError(null);
      
      const cancelReservation = async () => {
        try {
          await changeStatus(reservation_id, "cancelled", ac.signal);
          window.location.reload(false);
        } catch (error) {
          setReservationsError(error);
        }
      }
      cancelReservation();
      return () => ac.abort();
    }
  }

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
        <td key="06">
          {
            reservation.status === "booked"
            ? <a className="btn btn-warning" name="edit" href={`/reservations/${reservation.reservation_id}/edit`}>EDIT</a>
            : null 
          }
        </td>
        <td key="07">
          {
            reservation.status !== "cancelled"
            ? <button className="btn btn-danger" name="cancel" data-reservation-id-cancel={reservation.reservation_id}
              onClick={() => cancelHandler(reservation.reservation_id)}>
                CANCEL
              </button>
            : null 
          }
        </td>
      </tr>
    )
}