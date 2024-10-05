const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId

const adminModel = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true, unique: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true}
})

exports.Admin = mongoose.model("admin", adminModel);