const ProductImg = require("../models/ProductImg")
const catchError = require("../utils/catchError")


const getAllProductImgs = catchError(async (req, res) => {
    const productImages = await ProductImg.findAll()

    return res.json(productImages)
})

const createProductImg = catchError(async (req, res) => {
    //const { name } = req.body;

    const productCreated = await ProductImg.create(req.body)

    return res.status(201).json(productCreated)
})

const deleteProductImg = catchError(async (req, res) => {
    const { id } = req.params;

    const productUpdated = await ProductImg.destroy({ where: { id }})
    if(!productUpdated) return res.status(404).send("Product Image not found")

    return res.sendStatus(204)
})

module.exports = {
    getAllProductImgs,
    createProductImg,
    deleteProductImg
}