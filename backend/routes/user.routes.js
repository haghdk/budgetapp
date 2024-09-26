const express = require("express");
const userController = require("../controllers/user.controller");
const iprestrictionMiddleware = require("../middleware/iprestriction.middleware");
const router = express.Router();

router.post("/register", iprestrictionMiddleware.restrictByIp, (req, res) => userController.register(req, res));
router.post("/refresh-token", (req, res) => userController.refreshToken(req, res));
router.post("/login", (req, res) => userController.login(req, res));

module.exports = router;
