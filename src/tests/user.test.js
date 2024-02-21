const supertest = require("supertest")
const app = require("../app")
const userCreate = require("./createData/userCreate")

const request = supertest(app)

const BASE_URL = "/users"

const user = {
    firstName: "Michael",
    lastName: "Martinez",
    email: "michael@example.com",
    password: "michael123",
    phone: "+5432343223"
}

let userId
let TOKEN


beforeAll(async () => {
    const user = {
        email: "jhon@example.com",
        password: "jhon123"
    }

    const res = await request
        .post(`${BASE_URL}/login`)
        .send(user)

    TOKEN = res.body.token
})

// POST '/users'
test("POST '/users' should return status 201, 'res.body' should be defined and 'res.body.name' should be equal to 'user.name'", async () => {
    const res = await request
        .post(BASE_URL)
        .send(user)

    userId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(user.name)
})

// GET '/users'
test("GET '/users' should return status 200, 'res.body' should be defined and 'res.body' length should be equal to '2'", async () => {
    const res = await request
        .get(BASE_URL)
        .set("authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
})

// PUT '/users/:id'
test("PUT '/users/:id' should return status 200, 'res.body' should defined and 'res.body.firstName' should be equal to 'newUser.firstName'", async () => {
    const newUser = {
        firstName: "Rachelle"
    }

    const res = await request
        .put(`${BASE_URL}/${userId}`)
        .send(newUser)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(newUser.firstName)
})

// POST '/users/login' success login
test("POST '/users/login' should return status 200, 'res.body' should be defined, 'res.body.user.email' should be equal to 'userLogin.email' and 'res.body.token' should be defined", async () => {
    const userLogin = {
        email: "michael@example.com",
        password: "michael123"
    }

    const res = await request
        .post(`${BASE_URL}/login`)
        .send(userLogin)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
})

// POST '/users/login' failed login
test("POST '/users/login' should return status 401", async () => {
    const userLogin = {
        email: "michael@example.com",
        password: "password"
    }

    const res = await request
        .post(`${BASE_URL}/login`)
        .send(userLogin)

    expect(res.status).toBe(401)
})

// DELETE '/users/:id'
test("DELETE '/users/:id' should return status 204", async () => {
    const res = await request
        .delete(`${BASE_URL}/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})