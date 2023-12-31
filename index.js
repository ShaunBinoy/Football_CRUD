const express = require('express');
const mongoose = require('mongoose');
const homeRoute =  require('./routes/home');
const club = require('./models/club');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

 

const app = express();
const PORT = process.env.PORT || 4000;
mongoose.connect('mongodb://127.0.0.1:27017/crud_app');
const db = mongoose.connection;
db.on('error',()=> console.log("Something is Worng!!!"));
db.once('open',()=>{
    console.log("DB connected Successfully.");
})


// MIDDLEWEAR
app.set('view engine', 'ejs');

// STATIC FOLDER SETUP
app.use(express.static('public'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// ROUTING
app.use('/',homeRoute)


app.listen(PORT,()=>{
    console.log(`Serever coneccted in http://localhost:${PORT}`);
})