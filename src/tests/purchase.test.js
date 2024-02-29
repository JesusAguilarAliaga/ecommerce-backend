const supertest = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
require("../models")

const request = supertest(app)

const BASE_URL = "/purchase"
let token
let userId
let product

beforeAll(async () => {
    const user = {
        email: "jhon@example.com",
        password: "jhon123"
    }

    const res = await request
        .post("/users/login")
        .send(user)

    token = res.body.token
    userId = res.body.user.id

    product = await Product.create({
        title: "Tv LG opur",
        description: "Tv LG 32 pulgadas",
        price: "20000"
    })

    await request
        .post("/cart")
        .send({
            quantity: 1,
            productId: product.id
        })
        .set("Authorization", `Bearer ${token}`)
})

test("POST '/puchases' should return status 201, 'res.body' to be defined and 'res.body.quantity' should be equal to '1'", async() => {
    const res = await request
        .post(BASE_URL)
        .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET '/purchases' should return status 200, 'res.body' to be defined and 'res.body' length should be equal to '1'", async() => {
    const res = await request
        .get(BASE_URL)
        .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    await product.destroy()
})