const express = require("express")
const { getAllProducts, createProduct, getOneProduct, updateProduct, deleteProduct, setProductImg } = require("../controllers/product.controller")
const verifyJWT = require("../utils/verifyJWT")

const productRouter = express.Router()

productRouter.route("/")
    .get(getAllProducts)
    .post(verifyJWT, createProduct)

productRouter.route("/:id/images")
    .post(verifyJWT, setProductImg)

productRouter.route("/:id")
    .get(getOneProduct)
    .put(verifyJWT, updateProduct)
    .delete(verifyJWT, deleteProduct)


module.exports = productRouter;