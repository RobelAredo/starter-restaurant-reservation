const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./tables.controller");

router.route("/:table_id/seat")
  .put(controller.update)
  .all(methodNotAllowed);
  

router.route("/seat")
  .get(controller.listAvailable)
  .all(methodNotAllowed);

router.route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;