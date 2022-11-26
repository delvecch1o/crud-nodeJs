require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./src/routes/routes')

const app = express()


const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(routes);


app.use(
    express.urlencoded({
        extended: true,
    }),
)


mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api.0uf0lpq.mongodb.net/bancoApi?retryWrites=true&w=majority`
)
    .then(() => {
        console.log("Conectou ao banco")
        app.listen(5000)
    })
    .catch((err) => console.log(err));