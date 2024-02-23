const Category = require("../models/Category");
const Product = require("../models/Product");
const catchError = require("../utils/catchError")

const getAllProducts = catchError(async (req, res) => {
    const products = await Product.findAll({ include: [Category]});

    return res.send(products);
})

const getOneProduct = catchError(async (req, res) => {
    const { id } = req.params
    const product = await Product.findByPk(id);

    if(!product) return res.send("Product not found").status(404);


    return res.json(product)
})

const createProduct = catchError(async (req, res) => {

    const productCreated = await Product.create(req.body)

    return res.status(201).json(productCreated)
})

const deleteProduct = catchError(async (req, res) => {
    const { id } = req.params;

    const productDeleted = await Product.destroy({ where: {id}})

    if(!productDeleted) return res.send("Product not found").status(404);

    return res.status(204).send("Product deleted")
})

const updateProduct = catchError(async (req, res) => {
    const { id } = req.params;

    const productId = await Product.findByPk(id)

    if(!productId) return res.status(404).send("Product not found")

    const productUpdated = await Product.update(req.body, {
        where: { id },
        returning: true
    })


    return res.json(productUpdated[1][0])
})


// product/id/img
/* const setProductImg = catchError(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByPk(id)
    if(!product) return res.status(404).send("Product not found")

    await

}) */



module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    deleteProduct,
    updateProduct
}