const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure 
const PostSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        type_id: Number,
        user_id: Number,
        location: String,
        comments:[],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

PostSchema.virtual('types', {
    ref: 'Types',
    localField: 'type_id',
    foreignField: 'id',
    justOne: true,
})

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Post', PostSchema)