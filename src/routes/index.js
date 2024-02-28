const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./products.router');
const productImgRouter = require('./productImg.router');
const verifyJWT = require('../utils/verifyJWT');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter)
router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.use("/product_images", productImgRouter)
router.use("/cart", verifyJWT, cartRouter)
router.use("/purchase", verifyJWT, purchaseRouter)

module.exports = router;