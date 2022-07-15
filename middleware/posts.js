const Post = require('../models/posts')

const checkIfPostOwner  =  (req, res, next)  => {
    Post.findOne({ _id: req.params.id }, (err, data) => {
        if (err && err.name === 'CastError') {
            return res.status(404).json({
                message: "Post not found"
            })
        } else {
            if (err) next(err);
            if (data.author_id == req.user.id) {
                return next();
            } else {
                return res.status(401).json({
                    message: "User does not have access to post"
                });
            }
        }
    });
};

module.exports = { checkIfPostOwner }
