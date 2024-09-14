const express = require("express");
const incomeController = require("../controllers/income.controller");
const router = express.Router();

router.post("/", (req, res) => incomeController.addIncome(req, res));
router.get("/:budgetId", (req, res) => incomeController.listIncomeInBudget(req, res));

module.exports = router;
