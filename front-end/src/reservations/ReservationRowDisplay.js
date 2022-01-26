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
      <>
        <td >{reservation.reservation_time}</td>
        <td >{reservation.first_name}&nbsp;{reservation.last_name}</td>
        <td >{reservation.people}</td>
        <td className="text-info font-weight-bold" data-reservation-id-status={`${reservation.reservation_id}`}>
          {reservation.status.toUpperCase()}
        </td>
        <td >
          {
            reservation.status === "booked"
            ? <a className="btn btn-outline-info btn-sm" name="seat" href={`/reservations/${reservation.reservation_id}/seat`}>SEAT</a>
            : null
          }
        </td>
        <td >
          {
            reservation.status === "booked"
            ? <a className="btn btn-outline-info btn-sm" name="edit" href={`/reservations/${reservation.reservation_id}/edit`}>EDIT</a>
            : null 
          }
        </td>
        <td >
          {
            reservation.status === "booked"
            ? <button className="btn btn-outline-info btn-sm mr-5" name="cancel" data-reservation-id-cancel={reservation.reservation_id}
              onClick={() => cancelHandler(reservation.reservation_id)}>
                CANCEL
              </button>
            : null 
          }
        </td>
      </>
    )
}