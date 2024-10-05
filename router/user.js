const express = require("express")
const router = express.Router();
const userController = require("../controller/user");
const {userMiddleware} = require("../middleware/user")

router
    .post("/signup", userController.signup)
    .post("/signin", userController.signin)
    .get("/purchases", userMiddleware, userController.purchases)

exports.router = router;