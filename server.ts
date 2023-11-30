import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

//Routes
import authRoutes from './routes/authRoutes'
import feedRoutes from './routes/feedRoutes'
import agendaRoutes from './routes/agendaRoutes'
import checkinRoutes from './routes/checkinRoutes'
import userRoutes from './routes/userRoutes'

// Initialize dotenv
dotenv.config()

//

// Initialize App
const app: Express = express()

//Applications
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Parse incoming JSON requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Use Cors
app.use(cors())

// Use Static Files
app.use('/uploads', express.static('uploads'))
app.use('/uploads/images', express.static('uploads/images'))


//auth
app.use('/api/auth',authRoutes)
app.use('/api/feed',feedRoutes)
app.use('/api/agenda',agendaRoutes)
app.use('/api/checkin',checkinRoutes)
app.use('/api/user',userRoutes)

// Listen Port
const port: string | number = process.env.PORT || 3000
const env: string = process.env.ENV || 'development'

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  console.log(`App listening on env ${env}`)
  console.log(`Press Ctrl+C to quit.`)
})