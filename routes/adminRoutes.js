var express = require('express');
var router = express.Router();
const controllerz = require('../controllers/adminControl');
const controllery = require('../controllers/post');
const authorization = require('../middleware/token');

router.post('/login', controllerz.adminLogin );
router.post('/signup', controllerz.adminReg );
router.get('/total', controllerz.total );
router.put('/updateuser/:id', controllerz.updateUser );

router.post('/create', authorization, controllery.createPost );
router.get('/allpost', authorization, controllery.getAllPost);
router.get('/singlepost/:id', authorization, controllery.getParticularPost);
router.put('/updatepost/:id', authorization, controllery.updatePost );
router.delete('/delete/:id', authorization,  controllery.deletePost);


module.exports = router;
