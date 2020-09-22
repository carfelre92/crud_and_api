const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure 
const PostSchema = new Schema(
    {
        id: Number,
        postImage: String,
        postImageURL: String,
        userPhoto: String,
        title: String,
        description: String,
        type_id: Number,
        user_id: Number,
        comments:[],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

PostSchema.virtual('type', {
    ref: 'Types',
    localField: 'type_id',
    foreignField: 'id',
    justOne: true,
})

PostSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'id',
    justOne: true,
})

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Post', PostSchema)