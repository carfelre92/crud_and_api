const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        id: Number,
        userName: String,
        email: String,
        password: String,
        location: String,
        profileImage: String,

    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

UserSchema.virtual('projects', {
    ref: 'Project', // The model to use
    localField: 'id', 
    foreignField: 'user_id', 
    justOne: false,
  })

  module.exports = mongoose.model('User',UserSchema)