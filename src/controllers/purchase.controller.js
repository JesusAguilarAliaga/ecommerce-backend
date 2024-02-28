const Cart = require("../models/Cart")
const Category = require("../models/Category")
const Product = require("../models/Product")
const ProductImg = require("../models/ProductImg")
const Purchase = require("../models/Purchase")
const User = require("../models/User")
const catchError = require("../utils/catchError")

const getAllPurchases = catchError(async (req, res) => {
    const userId = req.user.id

    const purchases = await Purchase.findAll({
        where: { userId },
        include: [{
            model: Product,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [{
                model: Category,
                attributes: ["name"]
            }, {
                model: ProductImg
            }]
        }]
    })

    return res.json(purchases)
})

const createPurchase = catchError(async (req, res) => {
    const userId = req.user.id

    const cartOfUser = await Cart.findAll({
        where: { userId },
        raw: true
    })

    if (!cartOfUser) return res.status(404).send("Cart not found")
    const purchaseCreated = await Purchase.bulkCreate(cartOfUser)
    if (!purchaseCreated) return res.status(404)

    await Cart.destroy({
        where: { userId }
    })

    return res.status(201).json(purchaseCreated)
})


module.exports = {
    getAllPurchases,
    createPurchase
}