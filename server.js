const express = require("express");
const itemsRoutes = require("./routes/itemsApi");
const connectDB = require('./config/db')
const path = require('path')
// const path = require("path");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database connection
connectDB();

//routes middleware
app.use('/api', itemsRoutes)

//serve static assets in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`))

