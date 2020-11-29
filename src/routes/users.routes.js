const { Router } = require('express')
const router = Router()

const usersController = require('../controllers/users.controllers')
const verifyToken = require('../controllers/verifyToken')

// Routes
router.get('/', usersController.getUsers)
router.post('/', usersController.postUser)
router.put('/', verifyToken, usersController.updateUser)
router.delete('/', verifyToken, usersController.deleteUser)

// signin || signup
router.post('/signin', usersController.signIn)
router.post('/signup', usersController.signUp)
router.get('/me/dashboard', verifyToken, usersController.dashboard)

module.exports = router