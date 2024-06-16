const express = require('express');
const { loginController, registerController, authController } = require('../controllers/UserCtrl');
const authMiddleware = require('../middleware/authMiddleware');



const router = express.Router();

//Login || Post
router.post('/login', loginController);

//Register || Post
router.post('/register', registerController);

//Auth || Post
router.post('/getuserData',authMiddleware ,authController)



module.exports = router;