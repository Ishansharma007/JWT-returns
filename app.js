//jshintesversion:6

require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let saltRounds = 10;
let port = 3000 ;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/peopleDB", {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    age : Number,
    email : String,
    password: String
});

const Person = mongoose.model("Person", personSchema) ;



app.post("/register", (req, res) => {

   
   bcrypt.hash(req.body.password, saltRounds, (err, hash) => {

    const newUser = new Person({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        email: req.body.email,
        password: hash
    });
 
    newUser.save();
    
    console.log(newUser);

   }) 

   
});








app.listen(port, function() {
    console.log(`server has started on port ${port}`);
});