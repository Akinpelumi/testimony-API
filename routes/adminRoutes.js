var express = require('express');
var router = express.Router();
const controllerz = require('../controllers/adminControl');
const controllery = require('../controllers/post');
const authorization = require('../middleware/token');
const authMiddleware = require('../middleware/auth');

router.post('/login', controllerz.adminLogin );
router.post('/signup', controllerz.adminReg );

router.use(authorization, authMiddleware.checkIfAdminUser)

router.get('/all-admins', controllerz.allAdmins );
router.get('/all-users', controllerz.allUsers );
router.put('/update-user/:id', controllerz.updateUser );

router.post('/create-post', controllery.createPost );
router.get('/all-posts', controllery.getAllPost);
router.get('/single-post/:id', controllery.getParticularPost);
router.put('/update-post/:id', controllery.updatePost );
router.delete('/delete-post/:id',  controllery.deletePost);


module.exports = router;
