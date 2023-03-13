const mongoose = require('mongoose')
const{ isEmail } = require('validator')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valide email'],
        lowercase: true,
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum characters should be 8'],
    }
})

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        }
        throw Error('Incorrect password');

    }
    throw Error('Incorrect email');
}

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()


})


const User = mongoose.model('user', userSchema)
module.exports = User