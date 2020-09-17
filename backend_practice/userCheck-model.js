const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserCheckSchema = new Schema(
    {
        id:Number,
        userName:String,
    }
)

module.exports = mongoose.model('UserCheck',UserCheckSchema);