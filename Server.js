
/** 
*import express
*import Path
*import mongoose
*Importe User Schema
**/
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/User');
var router = express.Router();

const app = express()
app.use(express.json());

//localhost Port
const port = process.env.PORT || '8000';

//connected to database
mongoose.connect('mongodb://localhost/Rest-API' , { useNewUrlParser: true, useUnifiedTopology: true } , (err)=>{
  if(err){
      console.log(err)
  } 
  
  console.log('connected to DataBase ');

})



//get all User
app.get('/', (req, res) => {
  User.find({},(err, result)=> {
    err ? res.status(404).send(err) : res.status(200).send(result);
})
})

//insert User
app.post('/register', (req , res)=>{
    const newUser = new User(req.body)
    newUser
        .save()
        .then((result) => {
          res.status(200).send(result)
        })
         .catch((err) => {
          res.status(404).json({
          message: err.message,
          });
         });
})

//Update User
app.put('/updateUser/:userId',(req , res)=>{
  const userId = req.params.userId;
  const userUpdate = req.body;
  User.findOneAndUpdate({ _id: userId}, { $set: userUpdate })
  .then((result) => {
    if (result) {
      res.status(202).send(result)
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  })
  .catch((err) => {
    res.status(404).json({
      message: err.message,
    });
  });
})

//Delete User
app.delete('/deleteUser/:userId',(req , res)=>{
  const userId = req.params.userId;
  User.findOneAndDelete({ _id: userId })
  .then((result) => {
    if (result) {
      res.status(200).json({
        message: "User Deleted",
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  })
  .catch((err) => {
    res.status(404).json({
      message: err.message,
    });
  });
})

//Connect server
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })