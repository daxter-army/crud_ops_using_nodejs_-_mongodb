require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5e733ac890a0b41058468636', {username: 'Daxter Singh'}).then((user) => {
    console.log(user)
    return User.countDocuments({username: "Daxter Singh"})
}).then((result) =>{
    console.log(result)
}).catch((e) => {
    console.log(e)
})