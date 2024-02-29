const supertest = require("supertest")
const app = require("../app")
const Category = require("../models/Category")
require("../models")

const request = supertest(app)
const BASE_URL = "/products"

let category
let product
let productId
let TOKEN

beforeAll(async () => {
    const user = {
        email: "jhon@example.com",
        password: "jhon123"
    }

    const res = await request
        .post(`/users/login`)
        .send(user)

    TOKEN = res.body.token

    category = await Category.create({
        name: "Tvs"
    })

    product = {

        title: "Tv LG",
        description: "Tv LG 32 pulgadas",
        price: "20000",
        categoryId: category.id

    }
})


test("POST '/products' should return status 201, 'res.body' should be defined and 'res.body.name' should be equal to 'product.title'", async () => {
    const res = await request
        .post(BASE_URL)
        .send(product)
        .set("Authorization", `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("GET '/products' should return status 200, 'res.body' should be defined and 'res.body' length should be equal to '1'", async () => {
    const res = await request
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET '/products/:id' should return status 200, 'res.body' to be defined and 'res.body.title' should be equal to 'product.title'", async () => {
    const res = await request
        .get(`${BASE_URL}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("PUT '/products/:id' should return status 200, 'res.body' to be defined and 'res.body.title' should be equal to 'newProduct.title'", async () => {
    const newProduct = {
        title: "Tv Samsung"
    }

    const res = await request
        .put(`${BASE_URL}/${productId}`)
        .send(newProduct)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(newProduct.title)
})

test("DELETE '/product/:id' should return status 204", async () => {
    const res = await request
        .delete(`${BASE_URL}/${productId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

    await category.destroy()
})