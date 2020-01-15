const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');


require('dotenv').config();
const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open' , ()=>{
    console.log("MongoDB database connectione stablished successfully");
})

const taskRouter = require('./routes/tasks');
const users = require('./routes/users')

app.use('',taskRouter);
app.use('',users);

app.listen(port, function() {
});


