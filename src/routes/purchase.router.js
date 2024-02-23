const express = require("express");
const { getAllPurchases, createPurchase } = require("../controllers/purchase.controller");

const purchaseRouter = express.Router()

purchaseRouter.route("/")
    .get(getAllPurchases)
    .post(createPurchase)



module.exports = purchaseRouter;