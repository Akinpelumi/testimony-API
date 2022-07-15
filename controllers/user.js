const bcrypt = require('bcryptjs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
var dotenv = require('dotenv').config();

const  signup  = async(req,  res,  next) => {
  const{  first_name, last_name, email,  password } = req.body;
  User.findOne({email},  (err, data) => {
    if(data) {
      return res.status(404).json({
        message:  `User with email '${email}' already exist`
      })
    }else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
          const  newUser  = new User({
            first_name,
            last_name,
            password: hash,
            email
          })
          const { _id, created_at, updated_at, isAdmin } = newUser
          const data = {
            _id, first_name, last_name, email, isAdmin, created_at, updated_at
          }
          await newUser.save((err) => {
            if (err) {
              return next(err)
            }else{
              return res.status(201).json({
                message: 'User Signup Successful',
                data
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
          const token  = jwt.sign({ id: data._id, isAdmin: data.isAdmin}, process.env.SECRET, {expiresIn: "4h"})
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
