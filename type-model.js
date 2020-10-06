var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this will be our data base's data structure 
var TypeSchema = new Schema(
  {
    id: Number,
    location: String,
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

TypeSchema.virtual('posts', {
  ref: 'Post', // The model to use
  localField: 'id', 
  foreignField: 'type_id', 
  justOne: false,
})


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Types', TypeSchema);