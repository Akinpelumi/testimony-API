var express = require('express');
var router = express.Router();
const controllerx = require('../controllers/user');
const controllery = require('../controllers/post');
const authorization = require('../middleware/token');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'Welcome'
  })
});

router.post('/login', controllerx.login );
router.post('/signup', controllerx.signup );

router.post('/create', authorization, controllery.createPost );
router.get('/allpost', authorization, controllery.getAllPost);
router.get('/singlepost/:id', authorization, controllery.getParticularPost);


module.exports = router;
