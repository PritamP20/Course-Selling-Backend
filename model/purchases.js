const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const objectId = Schema.ObjectId

const purchaseModel = new Schema({
    courseId: objectId,
    userId: objectId
})

exports.Purchase = mongoose.model("purchase", purchaseModel)