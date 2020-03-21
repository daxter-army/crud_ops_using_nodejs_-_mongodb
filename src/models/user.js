const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            const err = ['@','!','#','$','%','^','&','*','<','>','{','}','[',']','+','=','/','?']
            for(let i=0 ; i<18;i++){
                const result = value.includes(err[i])
                if(result) {
                    throw new Error("Username is only allowed to contain '-' & '_'.")
                }   
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error("Password can't contain 'password'.")
            }
        }
    }
})

module.exports = User