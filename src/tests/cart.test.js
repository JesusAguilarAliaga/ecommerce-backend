const supertest = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
require("../models")

const request = supertest(app)
const BASE_URL = "/cart"
let token
let product
let cartId

beforeAll(async () => {
    const user = {
        email: "jhon@example.com",
        password: "jhon123"
    }

    const login = await request
        .post("/users/login")
        .send(user)

    token = login.body.token

    product = await Product.create({
        title: "Tv LG1312",
        description: "Tv LG 32 pulgadas",
        price: "20000"
    })
})

test("POST '/cart' should return status 201, 'res.body' should be defined and 'res.body.quantity' should be equal to '1'", async () => {
    const res = await request
        .post(BASE_URL)
        .send({
            quantity: 1,
            productId: product.id
        })
        .set("Authorization", `Bearer ${token}`)

    cartId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(1)
})

test("GET '/cart' should return status 200, 'res.body' should be defined and 'res.body' length should be equal to '1'", async () => {
    const res = await request
        .get(BASE_URL)
        .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET '/cart/:id' should return status 200, 'res.body' should be defined and 'res.body.quantity' should be equal to '1'", async () => {
    const res = await request
        .get(`${BASE_URL}/${cartId}`)
        .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(1)
})

test("UPDATE '/cart/:id' should return status 200, 'res.body' should be defined and 'res.body.quantity' should be equal to '2'", async () => {
    const res = await request
        .put(`${BASE_URL}/${cartId}`)
        .send({ quantity: 2 })
        .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(2)
})

test("DELETE '/cart/:id' should return status 204", async () => {
    const res = await request
        .delete(`${BASE_URL}/${cartId}`)
        .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(204)
    await product.destroy()
})