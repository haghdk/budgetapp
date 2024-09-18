const express = require("express");
const userController = require("../controllers/user.controller");
const iprestrictionMiddleware = require("../middleware/iprestriction.middleware");
const router = express.Router();

router.post("/register", iprestrictionMiddleware.restrictByIp, (req, res) => userController.register(req, res));

module.exports = router;
