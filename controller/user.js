const model = require("../model/user")
const USER = model.user;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { Course } = require("../model/course");
const { Purchase } = require("../model/purchases");
const JWT_USER_PASSWORD = "samruttha"

exports.signup = async(req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        
        console.log("Request body:", req.body); 
        
        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const data = {
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        };

        const user = new USER(data);
        const savedModel = await user.save();

        res.status(201).json({
            message: "Success",
            model: savedModel
        });
    } catch (error) {
        console.error("Error saving User:", error); 
        res.status(400).json({
            message: "Error occurred",
            error: error.message
        });
    }
};


exports.signin = async (req, res) => {
    const {email, password} = req.body;
    console.log("user")
    console.log(password)

    const user = await USER.findOne({ email });
    console.log(user)
    if(!user){
        res.status(401).json("user not found, invalid credentials")
    }

    let isMatch = bcrypt.compare(password, user.password)

    if(isMatch){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)
        res.status(201).json(token)
    }else{
        res.status(400).json("Incorrect password")
    }

    
};

exports.purchases = async(req, res)=>{
    const userId = req.userId;
    console.log(userId)
    const purchases = await Purchase.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await Course.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
}