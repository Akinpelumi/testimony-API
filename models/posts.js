const mongoose = require('mongoose');
const  Schema  =  mongoose.Schema;

const  postSchema = new Schema({
  title: { type: String, required:  true },
  testimony: { type: String, required:  true },
  name: { type: String,  required: true },
  created_at: { type: Date, default: Date.now}
})

const Post  = mongoose.model('Post',  postSchema);

module.exports = Post;