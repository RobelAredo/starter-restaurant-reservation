const service = require("./reservations.service");

function validReservationFields(req, res, next) {
  const reservation = req.body.data;
  if (!reservation) next({"status": 400, "message": "No data was sent."})
  const fields = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people", "status"];
  
  errorMessage = fields.reduce((acc, field) => {
    if (field === "reservation_date") {
      let error = field;
      const reservationDate = reservation[field];
      const currentDate = (new Date).toISOString().split("T")[0];
      if (!reservation[field]?.match(/^\d{4}-(0[1-9]|1[0-2])-([0][1-9]|[12][0-9]|[3][01])$/)) {
        error += " must be formatted yyyy-mm-dd"
      } else if (currentDate > reservationDate) {
        error += " must be a future date";
      } else if ((new Date(`${reservationDate} 00:00`)).getDay() === 2) {
        error += " cannot be on a Tuesday because we are closed";
      } else return acc;
      acc.push(error);
    } else if (field === "reservation_time") {
        let error = field;
        const sameDay = (new Date).toISOString().split("T")[0] === reservation.reservation_date;
        const date = new Date;
        const currentTime = date.toLocaleTimeString([], {hr12: false, hour: "2-digit", minute:"2-digit"});
        if (!reservation[field]?.match(/^(0[0-9]|1[0-9]|2[0-3]):([0-6][0-9])$/)) {
          error += " must be formatted hh:mm";
        } else if (sameDay && currentTime > reservation[field]) {
          error += " must be a future time.";
        } else if (reservation[field] < "10:30") {
          error += " must be after 10:30";
        } else if (reservation[field] > "21:30") {
          error += " must be before 9:30 pm becuse we close at 10:30 pm";
        } else return acc;
        acc.push(error);
    } else if (field === "people" && !Number.isInteger(reservation[field])) {
      acc.push(field);
      acc.push(`type ${typeof field}`)
    } else if (field === "status" && reservation[field] && reservation[field] != "booked") {
      console.log("ddddddddddddddddddd", !reservation[field])
      acc.push(`${field} ${reservation[field]} is invalid - reservation status must be 'booked' or missing`)
    } else if (!reservation[field] && field !== "status") {
      acc.push(`${field} field is missing`);
    }
    return acc;
  }, [])

  if (errorMessage.length) next({"status": 400, "message": "Error: " + errorMessage.join(", ")})
  next()
}

async function create(req, res) {
  const reservation = req.body.data;
  reservation.status = "booked";
  const data = await service.create(reservation);
  res.status("201").send({ data });
}

async function list (req, res) {
  const reservation_date = req.query.date ?? (new Date).toISOString().split("T")[0];
  const data = await service.list(reservation_date);
  res.json({data});
}

async function find (req, res) {
  const data = await service.find(req.params.reservation_id);
  res.status("200").send({data});
}

async function validReservation (req, res, next) {
  const {reservation_id} = req.params;
  const {status} = req.body.data;
  const reservation = await service.find(reservation_id);

  if (!reservation) return next({status: 404, message: `reservation ${reservation_id} does not exist.`})
  if (!status.match(/^booked$|^seated$|^finished$/)) return next({status: 400, message: `${status} is an invalid status to update.`})
  if (reservation.status === "finished") return next({status: 400, message: "cannot update a finished reservation."})
  return next();
}

async function update (req, res) {
  const {reservation_id} = req.params;
  const {status} = req.body.data;
  
  const data = await service.update(reservation_id, status);
  res.status("200").send({data});
}

module.exports = {
  list,
  create : [validReservationFields, create],
  find,
  update : [validReservation, update],
};
