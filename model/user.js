const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
    email: { type: String, required: true, unique: true }, // Unique only for email
    password: { type: String, required: true },            // Removed unique: true for password
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

exports.user = mongoose.model('user', userModel);
