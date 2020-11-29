const { Schema, model } = require('mongoose')
const bcryptjs = require('bcryptjs')

const usersSchema = new Schema({
    username: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imgProfile: { type: Buffer, required: false }
}, {
    versionKey: false
})

usersSchema.methods.encryptPassword = async (password) => {
    try {
        const salt = await bcryptjs.genSalt(10)
        return bcryptjs.hash(password, salt)
    } catch (err) {
        console.log(err)
    }
}

usersSchema.methods.validatePassword = function (password) {
    return bcryptjs.compare(password, this.password)
}

// Revisar si puedo enviar images por type: Image || type: Blob

module.exports = model('users', usersSchema)