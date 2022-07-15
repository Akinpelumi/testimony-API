var express = require('express');
var router = express.Router();
const controllerx = require('../controllers/user');
const controllery = require('../controllers/post');
const authorization = require('../middleware/token');
const authMiddleware = require('../middleware/auth');
const postMiddleware = require('../middleware/posts')

router.post('/signup', controllerx.signup );
router.post('/login', controllerx.login );

router.use(authorization, authMiddleware.checkIfNotAdminUser)

router.post('/create-post', authorization, controllery.createPost );
router.get('/all-posts', authorization, controllery.getAllPost);
router.get('/single-post/:id', authorization, controllery.getParticularPost);
router.put('/update-post/:id', postMiddleware.checkIfPostOwner, controllery.updatePost );
router.delete('/delete-post/:id', postMiddleware.checkIfPostOwner,  controllery.deletePost);


module.exports = router;
