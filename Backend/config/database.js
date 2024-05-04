const mongoose = require('mongoose');



exports.connectDatabase = () => {
    mongoose
    .connect(process.env.MONGO_URI)
//Learn about then function
    .then(console.log(`Data base connected`))
    .catch((err)=>console.log(err))
}