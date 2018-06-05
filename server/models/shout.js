const mongoose = require('mongoose')

const Schema = mongoose.Schema
const shoutSchema = new Schema({
    username: String,
    userId: String,
    messageContent: String
})

module.exports = mongoose.model('shout', shoutSchema, 'shouts')