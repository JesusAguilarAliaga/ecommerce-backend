const supertest = require("supertest")
const app = require("../app")

const request = supertest(app)

const BASE_URL = "/purchases"
let token
let categoryId
let productId
let cartId

beforeAll(async () => {
    const user = {
        email: "jhon@example.com",
        password: "jhon123"
    }

    const res = await request
        .post("/users/login")
        .send(user)

    token = res.body.token

    const category = await request
        .post("/categories")
        .send({ name: "Electrocs" })
        .set("Authorization", `Bearer ${token}`)

    categoryId = category.body.id

    const product = await request
        .post("/products")
        .send({
            title: "Tv LG",
            description: "Tv LG 32 pulgadas",
            price: "20000",
            categoryId: categoryId
        })
        .set("Authorization", `Bearer ${token}`)

    productId = product.body.id

    const cart = await request
        .post("/carts")
        .send({
            quantity: 1,
            productId
        })
        .set("Authorization", `Bearer ${token}`)

    cartId = cart.body.id
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

        console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})