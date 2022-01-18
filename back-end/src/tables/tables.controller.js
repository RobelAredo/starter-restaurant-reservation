const service = require("./tables.service");

function validTable (req, res, next) {
  const table = req.body.data;
  if (!table) next({status: 400, message: "Data is missing"});
  const fields = ["table_name", "capacity"];

  const errorMessage = fields.reduce((acc, field) => {
    if (!table[field]) {
      acc.push(`${field} is missing`);
    } else if (field === "table_name" && !table[field].match(/.{2}/)) {
      acc.push(`${field} requires at least 2 charachters`)
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

module.exports = {
  create: [validTable, create],
}