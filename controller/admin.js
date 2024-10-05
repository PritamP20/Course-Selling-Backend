const model = require("../model/admin");
const ADMIN = model.Admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Course} = require("../model/course")

const JWT_ADMIN_PASSWORD = "pritam"

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

        const admin = new ADMIN(data);
        const savedModel = await admin.save();

        res.status(201).json({
            message: "Success",
            model: savedModel
        });
    } catch (error) {
        console.error("Error saving admin:", error); 
        res.status(400).json({
            message: "Error occurred",
            error: error.message
        });
    }
};


exports.signin = async (req, res) => {
    const {email, password} = req.body;


    const admin = await ADMIN.findOne({ email });
    if(!admin){
        res.status(401).json("admin not found, invalid credentials")
    }

    const isMatch = bcrypt.compare(password, admin.password)
    if(isMatch){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD)
        res.status(201).json(token)
    }else{
        res.status(400).json("Incorrect password")
    }

    
};

exports.courseDef = async (req, res)=>{
    const adminId = req.userId;
    console.log("adminId", adminId)

    const {title, description, price, imageUrl, creatorId } = req.body;

    const course = await Course.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        courseId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
}

exports.updateCourse = async(req, res)=>{
    const adminId = req.userId;
    const {title, description, price, imageUrl, courseId } = req.body; 

    const course = await Course.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
}

exports.getAllCourse = async (req, res)=>{
    const adminId = req.userId;

    const courses = await Course.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
}