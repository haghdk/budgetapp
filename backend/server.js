const express = require("express");
const budgetRoutes = require("./routes/budget.routes");
const spendingRoutes = require("./routes/spending.routes");
const categoryRoutes = require("./routes/category.routes");
const incomeRoutes = require("./routes/income.routes");
const authRoutes = require("./routes/auth.routes");
const VERSION = "v1";
const PORT = process.env.PORT || 3000;

const app = express();
app.set('trust proxy', false);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/api/${VERSION}/budget`, budgetRoutes);
app.use(`/api/${VERSION}/spending`, spendingRoutes);
app.use(`/api/${VERSION}/category`, categoryRoutes);
app.use(`/api/${VERSION}/income`, incomeRoutes);
app.use(`/api/${VERSION}/auth`, authRoutes);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            error: "Invalid JSON format",
            message: "Please make sure your JSON payload is correct.",
        });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
