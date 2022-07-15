const mongoose = require('mongoose');
const  Schema  =  mongoose.Schema;

const  postSchema = new Schema({
  sku: { type: String, required:  true },
  title: { type: String, required:  true },
  testimony: { type: String, required:  true },
  name: { type: String,  required: true },
  author_id: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now}
})

const Post  = mongoose.model('Post',  postSchema);

module.exports = Post;