
// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, date: Date, text: String
})
var postSchema = new mongoose.Schema({
	id: Number, author: String, img: String, date: Date, text: String,
	comments: [ commentSchema ]
})

exports.Post = mongoose.model('post', postSchema)
