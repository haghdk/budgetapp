const express = require("express");
const budgetController = require("../controllers/budget.controller");
const router = express.Router();

router.post("/add", (req, res) => budgetController.addBudget(req, res));
router.get("/single/:budgetId", (req, res) => budgetController.getBudgetById(req, res));
router.get("/all", (req, res) => budgetController.listAllBudgets(req, res));

module.exports = router;
