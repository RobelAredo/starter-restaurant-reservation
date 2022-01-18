import React from "react";

export default function ReservationTable ({ reservations, date }) {

  const reservationList = reservations.map(({first_name, last_name, reservation_time, people}) => (
    <tr>
      <td>{reservation_time}</td>
      <td>{first_name} {last_name}</td>
      <td>{people}</td>
    </tr>
  ))

  return (
    <>
      <h4>Reservations for {date}</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Name</th>
            <th scope="col">Group Size</th>
          </tr>
        </thead>
        <tbody>
          {reservationList}
        </tbody>
      </table>
    </>
  )
}