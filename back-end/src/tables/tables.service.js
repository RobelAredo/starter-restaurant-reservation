const knex = require("../db/connection");

async function create (table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then(returning => returning[0]);
}


module.exports = {
  create,
}