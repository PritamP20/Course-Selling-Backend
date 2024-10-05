const {Course} = require("../model/course")
const {Purchase} = require("../model/purchases")

exports.pruchase = async (req, res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId

    const newPurchase = new Purchase({
        userId: userId,
        courseId: courseId
    })
    const savedcourse = await newPurchase.save()

    res.json({
        message: "You have successfully bought the course",
        purchased: savedcourse
    })
}

exports.preview =  async (req,res)=>{
    const courses = await Course.find({});

    res.json({
        courses
    })
}