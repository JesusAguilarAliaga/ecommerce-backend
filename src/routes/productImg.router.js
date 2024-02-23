const express = require("express")
const { getAllProductImgs, createProductImg, deleteProductImg } = require("../controllers/productImg.controller")
const verifyJWT = require("../utils/verifyJWT")

const productImgRouter = express.Router()

productImgRouter.route("/")
    .get(verifyJWT, getAllProductImgs)
    .post(verifyJWT, createProductImg)

productImgRouter.route("/:id")
    .delete(verifyJWT, deleteProductImg)


module.exports = productImgRouter;