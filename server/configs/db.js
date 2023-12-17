
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/google-docs-clone', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
})

const db = mongoose.connection
db.once('open',()=>{
    console.log("db connected")
})


module.exports = db;

