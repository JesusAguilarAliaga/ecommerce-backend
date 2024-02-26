const Cart = require("../models/Cart")
const Category = require("../models/Category")
const Product = require("../models/Product")
const User = require("../models/User")
const catchError = require("../utils/catchError")


const getAllCarts = catchError(async (req, res) => {
    const userId = req.user.id

    const cart = await Cart.findAll({
        where: { userId },
        include: [{
            model: Product,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
                model: Category,
                attributes: ["name"]
            }
        }]
    })

    return res.json(cart)
})

const createCarts = catchError(async (req, res) => {
    const userId = req.user.id;
    const { quantity, productId } = req.body;

    const newBody = {
        quantity,
        userId,
        productId
    }

    const cartCreated = await Cart.create(newBody)

    return res.status(201).json(cartCreated)
})

const updateCart = catchError(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id

    const cart = await Cart.findByPk(id)
    if (!cart) return res.status(403).send("Cart not found")

    const cartUpdated = await Cart.update({ quantity }, {
        where: { id, userId },
        returning: true
    })

    return res.json(cartUpdated[1][0])
})

const deleteCart = catchError(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id

    const cartToDelete = await Cart.destroy({ where: { id, userId } })
    if (!cartToDelete) return res.status(404).send("Cart not found")

    return res.sendStatus(204)
})

module.exports = {
    getAllCarts,
    createCarts,
    updateCart,
    deleteCart
}