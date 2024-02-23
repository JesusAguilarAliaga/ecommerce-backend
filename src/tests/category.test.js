const supertest = require("supertest")
const app = require("../app")

const request = supertest(app)

const BASE_URL = "/categories"

const category = {
    name: "Electronics"
}

let categoryId
let TOKEN

beforeAll(async() => {
    const user = {
        email: "jhon@example.com",
        password: "jhon123"
    }

    const res = await request
        .post(`/users/login`)
        .send(user)

    TOKEN = res.body.token
})

test("POST '/categories' should return status 201, 'res.body' should be defined and 'res.body.name' should be equal to 'category.name'", async () => {
    const res = await request
        .post(BASE_URL)
        .send(category)
        .set("Authorization", `Bearer ${TOKEN}`)

    categoryId = res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("GET '/categories' should return status 200, 'res.body' should be defined and 'res.body' length should be equal to '1'", async () => {
    const res = await request
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("DELETE '/categories/:id' should return status 204", async() => {
    const res = await request
        .delete(`${BASE_URL}/${categoryId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})