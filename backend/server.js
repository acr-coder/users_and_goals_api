const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const goalRoutes = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())

app.use('/api/goals', goalRoutes )
app.use('/api/users', userRoutes )

app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port ${port}`))