const express = require("express");
const authController = require("../controllers/auth.controller");
const iprestrictionMiddleware = require("../middleware/iprestriction.middleware");
const router = express.Router();

router.post("/register", iprestrictionMiddleware.restrictByIp, (req, res) => authController.register(req, res));

module.exports = router;
