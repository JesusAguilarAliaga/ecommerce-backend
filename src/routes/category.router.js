const express = require("express")
const { getAllCategories, deleteCategory, createCategory } = require("../controllers/category.controller")
const verifyJWT = require("../utils/verifyJWT")

const categoryRouter = express.Router()

categoryRouter.route("/")
    .get(getAllCategories)
    .post(verifyJWT, createCategory)


categoryRouter.route("/:id")
    .delete(verifyJWT, deleteCategory)

module.exports = categoryRouter;