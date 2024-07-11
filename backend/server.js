const express = require('express')
const budgetRoutes = require('./routes/budget.routes')
const spendingRoutes = require('./routes/spending.routes')
const categoryRoutes = require('./routes/category.routes')
const VERSION = 'v1'
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.urlencoded({ extended: true }))

app.use(`/api/${VERSION}/budget`, budgetRoutes)
app.use(`/api/${VERSION}/spending`, spendingRoutes)
app.use(`/api/${VERSION}/category`, categoryRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})