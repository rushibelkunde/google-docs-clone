
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {
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


