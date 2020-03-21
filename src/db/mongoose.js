const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dash-test-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    //For CRUD Operations
    useFindAndModify: false
})