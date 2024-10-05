const express = require("express")
const userRouter = require("./router/user");
const adminRouter = require("./router/admin")
const courseRouter = require("./router/course")
const { default: mongoose } = require("mongoose");

const server = express();


server.use(express.json());
server.use("/user", userRouter.router)
server.use("/admin", adminRouter.router)
server.use("/course", courseRouter.router)

async function main(){

    try {
        await mongoose.connect("mongodb+srv://Pritam:Pritam%402010@cluster0.dv9pv.mongodb.net/Course-app")
        console.log("mongoose connected")
        server.listen(3000)
        console.log("Listening on port 3000");
    } catch (error) {
        console.log("MongoDB Error or Port Error");
        throw new Error("Server crashed")
    }

}

main()