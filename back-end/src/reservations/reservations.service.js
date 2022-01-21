const knex = require("../db/connection");

async function create (reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then(reservations => reservations[0]);
}

async function list (reservation_date) {
  return knex("reservations")
    .where({reservation_date})
    .whereNot({status: "finished"})
    .orderBy("reservation_time")
}

async function find (reservation_id) {
  return knex("reservations")
    .where({reservation_id})
    .first();
}

async function update (reservation_id, status) {
  return knex("reservations")
    .where({reservation_id})
    .update({status})
    .returning("*")
    .then(reservations => reservations[0]);
}

module.exports = {
  list,
  create,
  find,
  update,
}