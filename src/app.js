require("dotenv").config();
const express = require('express');
const app = express();
require('./db/conn');
const Nsscontact = require('./models/contactmodel');
const path = require("path");
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const cookieParser = require('cookie-parser');
//const auth = require("../middleware/auth")

const port = process.env.PORT || 3000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files 
app.use(express.urlencoded({ extended: true })) //To extract the data from the website to the app.js file

// app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))) 
// app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js'))) 
// app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist'))) 

//app.use(cookieParser())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, '../views')) // Set the views directory

app.get("/", (req, res) => {
    res.render("index.pug")
});

app.post('/contact', (req, res)=>{
    var myData = new Nsscontact(req.body);
    console.log(myData)
    myData.save().then(item => {
      res.send("Response Submitted");
    }).catch(err => {
      res.status(400).send("unable to save your response try again later");
    });
})



app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});