const Post = require('../models/posts');
var dotenv = require('dotenv').config();


/* AUTHORIZED USER CAN SHARE TESTIMONY */
const  createPost = (req, res,  next) => {
    const{  sku, title, testimony,  name } = req.body;
    const { _id, isAdmin } = req.user;
    const authorIdOption = !isAdmin ? _id : null;
    Post.findOne({sku},  (err, data) => {
        if(!data) {
            const  newPost  = new Post({
                sku,
                title,
                testimony,
                name,
                author_id: authorIdOption
            })
            newPost.save((err) => {
                if (err) {
                    return next(err)
                }else{
                    const { _id, author_id, created_at, updated_at } = newPost;
                    const data = { _id, sku, title, name, author_id, created_at, updated_at }
                    return res.status(201).json({
                        message: 'post created successfully',
                        data
                    })
                }
            })
        } else {
            return res.status(409).json({
                message: "Duplicate post, this post already exist"
            });
        }
    })
};


/* AUTHORIZED USER CAN VIEW ALL TESTIMONIES */
const getAllPost = (req, res, next) => {
    Post.find({}, (err, data) => {
        if (err) next(err)
        else {
            res.status(200).json({
                message: 'Posts returned sucessfully',
                data
            })
        }
    })
}

/* AUTHORIZED USER CAN VIEW SPECIFIC TESTIMONY */
const getParticularPost = (req, res, next) => {
    Post.findById(req.params.id, (err, data, next) => {
        if (err) next(next);
        else {
            return res.status(200).json({ data })
        }
    })
}

/* ADMIN TO UPDATE TESTIMONY */
const updatePost = (req, res, next) => {
    const id = req.params.id
    const { title, testimony, name } = req.body
    Post.findOne({ _id: id }, (err, data) => {
        if (err) next(err);
        if (!data) {
            return res.status(404).json({
                message: "Post not found"
            })
        }else{
            if (title) {
                data.title = title;
            }
            if (testimony) {
                data.testimony = testimony;
            }
            if (name) {
                data.name = name;
            }
                
            data.save((err, updatedPost) => {
                if (err) {
                    next(err)
                }else{
                    res.status(200).json({
                        message: 'Post updated successfully', 
                        data: updatedPost 
                    });
                }
            })
        }
    })
}


/* ADMIN TO DELETE TESTIMONY */
const deletePost = (req, res, next) => {
    const id = req.params.id
    Post.findByIdAndDelete(req.params.id, (err) => {
        if (err) next(err);
        return res.status(201).json({
            message: 'Post has been deleted successfully'
        })
    })
}


module.exports = { createPost, getAllPost, getParticularPost, updatePost, deletePost };