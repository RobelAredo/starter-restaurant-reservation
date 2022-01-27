const knex = require("../db/connection");

async function create (reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then(reservations => reservations[0]);
}

async function search (mobile_number) {
  return knex("reservations")
    .whereRaw(`translate(mobile_number, '() -', '') like ?`,`%${mobile_number.replace(/\W/g, '')}%`)
    .orderBy("reservation_date")
    .orderBy("reservation_time")
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

async function edit ({reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people}) {
  return knex("reservations")
    .where({reservation_id})
    .update({
      first_name,
      last_name,
      mobile_number, 
      reservation_date, 
      reservation_time, 
      people})
    .returning("*")
    .then(reservations => reservations[0]);
}

module.exports = {
  list,
  create,
  find,
  update,
  search,
  edit,
}