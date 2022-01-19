const knex = require("../db/connection");

async function create (table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then(returning => returning[0]);
}

async function list () {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
}

async function listAvailable () {
  return knex("tables")
    .select("*")
    .whereNull("reservation_id")
    .orderBy("table_name");
}

async function unSeat (reservation_id) {
  return knex("tables")
      .where({reservation_id})
      .update({reservation_id: null})
      .returning("*");
}

async function validTable (table_id) {
  return knex("tables")
    .select("*")
    .where({table_id})
    .first();
}

async function validReservation (reservation_id) {
  return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first();
}

async function update (table_id, reservation_id) {
  return knex("tables")
    .where({table_id})
    .update({reservation_id})
    .returning("*");
}

module.exports = {
  list,
  listAvailable,
  create,
  unSeat,
  validTable,
  validReservation,
  update,
}