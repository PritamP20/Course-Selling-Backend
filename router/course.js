const express = require("express")
const router = express.Router()
const courseControl = require("../controller/course")
const {userMiddleware} = require("../middleware/user")


router
    .get("/preview", courseControl.preview)
    .post('/purchase', userMiddleware, courseControl.pruchase)

exports.router = router
