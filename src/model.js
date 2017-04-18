
// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var userSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String   
})

var profileSchema = new mongoose.Schema({
    username: String,
    headline: String,
    following: [ String ],
    email: String,
    zipcode: String,
    avatar: String
})

var commentSchema = new mongoose.Schema({
    commentId: Number, author: String, date: Date, text: String
})

var postSchema = new mongoose.Schema({
    author: String,
    text: String,
    date: Date,
    img: String, 
    comments: [{
        commentId: Number,
        author: String,
        date: Date,
        text: String,
    }]
})

exports.Post = mongoose.model('post', postSchema)
exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profiles', profileSchema)
