const express = require("express");
const { getAllCarts, createCarts, updateCart, deleteCart } = require("../controllers/cart.controller");

const cartRouter = express.Router()

cartRouter.route("/")
    .get(getAllCarts)
    .post(createCarts)


cartRouter.route("/:id")
    .put(updateCart)
    .delete(deleteCart)



module.exports = cartRouter;