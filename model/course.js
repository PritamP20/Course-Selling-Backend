const mongoose = require("mongoose")
const Schema = mongoose.Schema

const objectId = Schema.ObjectId

const courseModel = new Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true },
    imageUrl : {type: String, require: true},
    courseId: objectId
})

exports.Course = mongoose.model("course", courseModel);