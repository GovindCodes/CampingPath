var mongoose= require("mongoose");

//Schema setup
const Schema = mongoose.Schema
const campgroundSchema = new Schema({
name : String,
image: String,
description: String,
comments: [
   {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
   }
 ]
});
module.exports = mongoose.model('Campground',campgroundSchema);