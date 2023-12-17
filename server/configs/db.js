
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rushibelkunde18:skS3NK7pdNC7RZ9l@cluster0.oq669rh.mongodb.net/google-docs-clone?retryWrites=true&w=majority', {
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

// rushibelkunde18
// skS3NK7pdNC7RZ9l

// mongodb+srv://rushibelkunde18:<password>@cluster0.oq669rh.mongodb.net/?retryWrites=true&w=majority
