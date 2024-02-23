const Product = require("../models/Product")
const Purchase = require("../models/Purchase")
const User = require("../models/User")
const catchError = require("../utils/catchError")

const getAllPurchases = catchError(async (req, res) => {
    const purchases = await Purchase.findAll({include: [User, Product]})

    return res.json(purchases)
})

const createPurchase = catchError(async (req, res) => {
    const purchaseCreated = await Purchase.create(req.body)

    return res.status(201).json(purchaseCreated)
})


module.exports = {
    getAllPurchases,
    createPurchase
}