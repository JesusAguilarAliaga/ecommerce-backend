const Category = require("../models/Category")
const catchError = require("../utils/catchError")

const getAllCategories = catchError(async (req, res) => {
    const categories = await Category.findAll()

    return res.json(categories)
})

const createCategory = catchError(async (req, res) => {
    //const { name } = req.body;

    const categoryCreated = await Category.create(req.body)

    return res.json(categoryCreated)
})

const deleteCategory = catchError(async (req, res) => {
    const { id } = req.params;

    const categoryToDelete = await Category.destroy({ where: { id }})
    if(!categoryToDelete) return res.status(404).send("Category not found")

    return res.sendStatus(204)
})

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory
}