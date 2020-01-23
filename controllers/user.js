const bcrypt = require('bcryptjs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
var dotenv = require('dotenv').config();

const  signup  = (req,  res,  next) => {
  const{  fullname, email,  password, isAdmin } = req.body;
  User.findOne({email},  (err, data) => {
    if(data) {
      return res.status(404).json({
        message:  'User  already exist'
      })
    }else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          console.log(err);
          const  newUser  = new User({
            fullname,
            password: hash,
            email,
            isAdmin
          })
          newUser.save((err) => {
            if (err) {
              return next(err)
            }else{
              return res.status(201).json({
                message: 'Signup  Successful'
              })
            }
          })
        })
       })
    }
  })
};

const login =  (req,  res,  next) => {
 const {email, password } =req.body;
  User.findOne({ email }, (err, data) => {
    if(err)  {
      next(err)
    };
    if(!data){
      return res.status(401).json({
        message: 'user does not exist'
      })
    }else{
      bcrypt.compare(password, data.password, (err,  match) =>  {
        if(!match) {
          return res.status(401).json({
            message: 'invalid login details'
          })
        }else{
          const token  = jwt.sign({ isAdmin: data.isAdmin}, process.env.SECRET, {expiresIn: "4h"})
          return res.status(200).json({
            message: 'login successful',
            token
          })
        }
      })
    }
  })
};


module.exports = { signup, login  };
