const service = require("./tables.service");

function validTableFields (req, res, next) {
  const table = req.body.data;
  if (!table) next({status: 400, message: "Data is missing"});
  const fields = ["table_name", "capacity"];

  const errorMessage = fields.reduce((acc, field) => {
    if (!table[field]) {
      acc.push(`${field} is missing`);
    } else if (field === "table_name" && !table[field].match(/.{2}/)) {
      acc.push(`${field} requires at least 2 charachters`)
    } else if (field === "capacity" && !Number.isInteger(table[field])) {
      acc.push(`${field} must be a number`)
    }
    return acc;
  }, [])

  return errorMessage.length
    ? next({status: 400, message: `Error: ${errorMessage.join(", ")}`})
    : next();
}

async function create (req, res) {
  const data = await service.create(req.body.data);
  res.status("201").send({data});
}

async function list (req, res) {
  const data = await service.list();
  res.status("200").send({data})
}

async function listAvailable (req, res) {
  const data = await service.listAvailable();
  res.status("201").send({data});
}

async function validSeating (req, res, next) {
  const x = req.body.data;
  console.log(x)
  if (!req.body.data) return next ({status: 400, message: "Data is missing"})
  
  const {table_id} = req.params;
  const {reservation_id} = req.body.data;
  if (!reservation_id) return next ({status: 400, message: "reservation_id required"})
  
  const table = await service.validTable(table_id);
  const reservation = await service.validReservation(reservation_id);
  
  if (!reservation) return next ({status: 404, message: `Reservation_id ${reservation_id} does not exist`});
  if (table.capacity < reservation.people) return next ({status: 400, message:`The table you selected has a capacity of ${table.capacity}. It cannot seat ${reservation.people} people.`});
  if (table.reservation_id) return next ({status: 400, message: `Table ${table_id} is occupied.`});
  return next();
}

async function update (req, res) {
  console.log("BE tables.controlloer update")
  const {table_id} = req.params;
  const {reservation_id} = req.body.data;
  const data = await service.update(table_id, reservation_id);
  res.status("200").send({data});
}

async function unSeat (req, res, next) {
  const {reservation_id} = req.body.data;
  service.unSeat(reservation_id)
  next();
}

async function destroy (req, res) {
  const {table_id} = req.params;
  const data = await service.destroy(table_id);
  res.status("200").send({data});
}

async function validTable (req, res, next) {
  const { table_id } = req.params;
  const table = await service.validTable(table_id);

  if (!table) return next({status: 404, message: `table ${table_id} does not exist`});
  if (!table.reservation_id) return next({status: 400, message: `table ${table_id} is not occupied`});
  return next();
}

module.exports = {
  list,
  listAvailable,
  create: [validTableFields, create],
  update: [validSeating, unSeat, update],
  destroy: [validTable, destroy]
}