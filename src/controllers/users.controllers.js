const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

class UsersControllers {
    getUsers = async (req, res) => {
        try {
            const users = await User.find()

            return res.json({ status: 'ok', users })
        } catch (err) {
            console.log(err)
            return res.json({ status: 'error', message: 'the users is undefined' })
        }
    }

    postUser = async (req, res) => {
        try {
            const newUser = new User(req.body)
            const result = await newUser.save()

            return res.json({ status: 'ok', message: 'user saved' })
        } catch (err) {
            console.log(err)
            return res.json({ status: 'error', message: "the user is wasn't created, your nickname is repeat" })
        }
    }

    updateUser = async (req, res) => {
        try {
            const { body, userID } = req
            await User.findByIdAndUpdate(userID, body)

            return res.json({ status: 'ok', message: 'user updated' })
        } catch (err) {
            console.log(err)
            return res.json({ status: 'error', message: "user isn't updated, your id don't exist" })
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { userID } = req
            console.log(userID)
            await User.findByIdAndDelete(userID)

            return res.json({ status: 'ok', message: 'user delete' })
        } catch (err) {
            return res.json({ status: 'error', message: "the user couldn't deleted, this id don't exist" })
        }
    }

    signUp = async (req, res, next) => {
        try {
            const { username, nickname, password, imgProfile } = req.body
            const userRegister = new User({ username, nickname, password, imgProfile })
            userRegister.password = await userRegister.encryptPassword(userRegister.password)
            await userRegister.save()
            const token = jwt.sign({ id: userRegister._id }, secret, {
                expiresIn: 60 ** 2 * 24 * 30 * 3
            })

            return res.json({
                status: 'ok',
                auth: true,
                token,
                message: 'user is signUp'
            })
        } catch (err) {
            console.log(err)
            return res.json({ status: 'error', message: "user couldn't signUp, repeat nickname" })
        }
    }

    signIn = async (req, res, next) => {
        try {
            const { nickname, password } = req.body
            const user = await User.findOne({ nickname })
            if (!user) return res.status(404).json({ auth: false, status: '404 - user Not Found' })

            const validatePass = await user.validatePassword(password)
            if (!validatePass) return res.status(401).json({
                auth: false,
                status: "credentials password or nickname don't match",
                token: null
            })

            const token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 60 ** 2 * 24 * 30 * 3
            })
            return res.json({ status: 'ok', auth: true, token, message: 'signIn-Validated' })
        } catch (err) {
            return res.json({
                status: 'error-credentials',
                message: "user access denegated, no token provider"
            })
        }
    }

    dashboard = async (req, res) => {
        try {
            const { userID } = req
            const user = await User.findById(userID, { password: 0 })
            if (!user) return res.status(404).json({ auth: false, status: '404 - user Not Found' })

            return res.json({
                status: 'ok',
                auth: true,
                user,
                message: 'success-dashboard'
            })
        } catch (err) {
            return res.json({
                status: 'error-credentials',
                message: "user access denegated, no token provider"
            })
        }
    }
}

const ClassUsers = new UsersControllers

module.exports = ClassUsers