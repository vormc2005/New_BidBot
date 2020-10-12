const express = require("express");
const mongoose = require("mongoose");
const itemsRoutes = require("./routes/itemsApi");
const connectDB = require('./config/db')
// const path = require("path");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database connection
connectDB();

//routes middleware
app.use('/api', itemsRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`))

