const ProductImg = require("../models/ProductImg")
const catchError = require("../utils/catchError")
const path = require("path")
const fs = require("fs")


const getAllProductImgs = catchError(async (req, res) => {
    const productImages = await ProductImg.findAll()

    return res.json(productImages)
})

const createProductImg = catchError(async (req, res) => {
    //const { name } = req.body;

    const { filename } = req.file

    const url = `${req.protocol}://${req.get("host")}/uploads/${filename}`

    const newBody = {
        url,
        filename
    }

    const productCreated = await ProductImg.create(newBody)

    return res.status(201).json(productCreated)
})

const deleteProductImg = catchError(async (req, res) => {
    const { id } = req.params;

    const productImg = await ProductImg.findByPk(id)
    if(!productImg) return res.status(404).send("Product Image not found")

    const imgUrl = path.join(__dirname, "..", "public", "uploads", `${productImg.filename}`)

    fs.unlinkSync(imgUrl)

    await productImg.destroy()

    return res.sendStatus(204)
})

module.exports = {
    getAllProductImgs,
    createProductImg,
    deleteProductImg
}