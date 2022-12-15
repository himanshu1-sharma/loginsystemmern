import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/DB.js";
import UserRoutes from './Routes/User.Route.js'


const app = express()
dotenv.config()

connectDB()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}))

app.get('/test', (req, res) => {
    res.send("API is running......")
})

app.use('/api/user', UserRoutes)


const PORT = process.env.PORT || 2020;
app.listen(PORT, console.log(`Server is running on port ${PORT}`))