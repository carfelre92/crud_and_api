const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure 
const ProjectSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        type_id: Number,
        user_id:Number,
    },
    { timestamps: true }
)

const UserSchema = new Schema(
    {
        id:Number,
        user_id:Number,
        userName:String,
        email:String,
        password:String,
        location:String,
        profileImage:String,
    }
)

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Project', ProjectSchema)