import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

//Routes
import authRoutes from './routes/authRoutes'

// Initialize dotenv
dotenv.config()

// Initialize App
const app: Express = express()

// Parse incoming JSON requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Use Cors
app.use(cors())


//auth
app.use('/api/auth',authRoutes)

// Listen Port
const port: string | number = process.env.PORT || 3000
const env: string = process.env.ENV || 'development'

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  console.log(`App listening on env ${env}`)
  console.log(`Press Ctrl+C to quit.`)
})