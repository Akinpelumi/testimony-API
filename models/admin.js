const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    //add the required:true
    name: {type: String, required:  true},
    email: {type: String, required:  true},
    password: {type: String, required:  true},
    isAdmin: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Admin', AdminSchema);
