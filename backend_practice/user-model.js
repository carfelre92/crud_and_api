var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema(
    {
        id: Number,
        userName: String,
        email: String,
        password: String,
        location: String,
        profileImage: String,
        profileImageURL: String,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

UserSchema.virtual('posts', {
    ref: 'Post', // The model to use
    localField: 'id', //field to compare with
    foreignField: 'user_id', //compare localField with foreignField and bring all projects with matching id-user_id
    justOne: false,
  })

module.exports = mongoose.model('User',UserSchema)