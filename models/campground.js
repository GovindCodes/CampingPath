var mongoose= require("mongoose");

//Schema setup
const Schema = mongoose.Schema
const campgroundSchema = new Schema({
name : String,
image: String,
description: String
});
module.exports = mongoose.model('Campground',campgroundSchema);