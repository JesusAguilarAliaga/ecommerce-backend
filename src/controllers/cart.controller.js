const Cart = require("../models/Cart")
const Product = require("../models/Product")
const User = require("../models/User")
const catchError = require("../utils/catchError")


const getAllCarts = catchError(async (req, res) => {
    const cart = await Cart.findAll({include: [Product, User]})

    return res.json(cart)
})

const createCarts = catchError(async (req, res) => {
    //const { name } = req.body;

    const cartCreated = await Cart.create(req.body)

    return res.status(201).json(cartCreated)
})

const updateCart = catchError(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findByPk(id)
    if(!cart) return res.status(404).send("Cart not found")

    const cartUpdated = await Cart.update({ quantity} , {
        where: { id },
        returning: true
    })

    return res.json(cartUpdated[1][0])
})

const deleteCart = catchError(async (req, res) => {
    const { id } = req.params;

    const cartToDelete = await Cart.destroy({ where: { id }})
    if(!cartToDelete) return res.status(404).send("Cart not found")

    return res.sendStatus(204)
})

module.exports = {
    getAllCarts,
    createCarts,
    updateCart,
    deleteCart
}