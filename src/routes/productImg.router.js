const express = require("express")
const { getAllProductImgs, createProductImg, deleteProductImg } = require("../controllers/productImg.controller")
const verifyJWT = require("../utils/verifyJWT")
const upload = require("../utils/multer")

const productImgRouter = express.Router()

productImgRouter.route("/")
    .get(getAllProductImgs)
    .post(upload.single("image"), createProductImg)
    //.post(verifyJWT, createProductImg)

productImgRouter.route("/:id")
    .delete(verifyJWT, deleteProductImg)


module.exports = productImgRouter;