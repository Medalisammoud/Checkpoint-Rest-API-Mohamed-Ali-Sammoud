
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

let Users = [];

//get all User
app.get('/', (req, res) => {
  res.send(Users.map(user=>user))
})

//insert User
app.post('/user/register', (req , res)=>{
    const newUser = new User(req.body)
    Users = [...Users , newUser];
    console.log(Users)
    newUser ? res.status(200).send(newUser) : res.status(404).send('Insert User');
})

//Update User
app.put('/updateUser/:userId',(req , res)=>{
  const userId = req.params.userId;
  const userUpdate = req.body;
  const user = Users.find(user => user._id == userId);
  user ? res.status(200).send(Users.map(user => user._id == userId ? {...user , ...userUpdate } : user)) : res.status(404).send('Update User faild')
})

//Delete User
app.delete('/deleteUser/:userId',(req , res)=>{
  const userId = req.params.userId;
  const user = Users.find(user => user._id == userId);
  user ? res.status(200).send(Users.map(user => user._id !== userId ? user : null )):res.status(404).send('Delete User faild')
})

//Connect server
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })