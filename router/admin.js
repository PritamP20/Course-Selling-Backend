const express = require("express")
const router = express.Router();
const adminController = require("../controller/admin")
const {adminMiddleware} = require("../middleware/admin")

router
    .post("/signup", adminController.signup)
    .post("/signin", adminController.signin)
    .post("/course", adminController.courseDef)
    .put("/course", adminMiddleware ,adminController.updateCourse)
    .get("/course", adminMiddleware, adminController.getAllCourse)

exports.router = router
