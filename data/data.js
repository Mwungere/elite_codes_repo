// const mongoose = require('mongoose')
// const dbUrl = 'mongodb://127.0.0.1:27017/reactApp'
// const connection = mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
// .then((result) => {
//     console.log('connected to db')
// }).catch((err) => console.log(err))
// const blogSchema = new mongoose.Schema({
//     title: {
//         required: true,
//         type:String,
//     },
//     body: {
//         required: true,
//         type:String,
//     },
//     author: {
//         required: true,
//         type:String,
//     }
// },{timestamps: true})

// const User = mongoose.model('blog', blogSchema)
// module.exports = {
//     User,
//     connection,
// }