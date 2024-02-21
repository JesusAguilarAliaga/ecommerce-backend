const express = require("express");
const { getAllUsers, createUser, deleteUser, updateUser, loginUser } = require("../controllers/user.controller");
const verifyJWT = require("../utils/verifyJWT");

const userRouter = express.Router();

userRouter.route("/")
    .get(verifyJWT, getAllUsers)
    .post(createUser);


userRouter.route("/login")
    .post(loginUser)

userRouter.route("/:id")
    .delete(verifyJWT, deleteUser)
    .put(verifyJWT, updateUser)

module.exports = userRouter