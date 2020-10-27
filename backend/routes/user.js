const express = require('express');

const userController = require('../controllers/user')
const router = express.Router();

router.get('/all', userController.getAllUsers)
router.post('/register', userController.registerUser)
//router.get('/login', userController.loginUser)
router.get('/login/:email/:password', userController.loginUser)
router.get('/user', userController.getUser)
router.put('/user', userController.putUser)
router.delete('/user/:id', userController.deleteUser)
// router.get('/admin', userController.getAdmin)
module.exports = router;