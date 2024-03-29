const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const adminReg = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            isAdmin
        } = req.body;
        var data = await Admin.findOne({
            email
        });
        if (data) {
            return res.status(400).json({
                message: `Admin with email '${email}' has been previously registered`
            });
        } else {
            var salt = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(password, salt);
            const newAdmin = new Admin({
                name,
                password: hash,
                email,
                isAdmin
            });
            const adminDetails = await newAdmin.save();
            const { _id, created_at, updated_at } = adminDetails
            const data = {
               _id,
               name,
               email,
               isAdmin,
               updated_at,
               created_at
            }
            return res.status(201).json({
                message: "Admin created successfully",
                data: data,
            });
        }
    } catch (err) {
        return next(err);
    }
};

const adminLogin = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        var data = await Admin.findOne({
            email
        });
        if (!data) {
            return res.status(401).json({
                message: "Invalid email/password"
            });
        } else {
            var isMatch = bcrypt.compare(password, data.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email/password"
                })
            } else {
                const token = jwt.sign({
                    id: data._id,
                    isAdmin: data.isAdmin
                }, process.env.SECRET, {
                    expiresIn: '12h'
                });
                return res.status(200).json({
                    message: "Logged in successfully",
                    token
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};

const allAdmins = (req,  res,  next) => {
    Admin.find({},  (err, data, next) => {
        if(err) next(next);
        else{
          return res.status(200).json({data})
        }
    })
};

const allUsers = (req,  res,  next) => {
    User.find({},  (err, data, next) => {
        if(err) next(next);
        else{
          return res.status(200).json({data})
        }
    })
};

const  updateUser  = (req,  res,  next)  => {
  if(!req.user){
    return res.status(401).json({
      message:  'You need to be an  admin to do this'
    })
  }else{
    User.findByIdAndUpdate(req.params.id, {isAdmin:  true}, (err) => {
      if(err) next(next);
      else{
        return res.status(200).json('Update successful')
      }
    })
  }   
};

module.exports = {adminReg, adminLogin, allAdmins, updateUser, allUsers};
