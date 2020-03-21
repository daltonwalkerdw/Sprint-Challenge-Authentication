const supertest = require("supertest")

const server = require("./api/server")
const db = require("./database/dbConfig")


// test("add user, check code", async () => {
//     const res = await supertest(server)
//     .post("/api/auth/register")
//     .send({username: "Dalton12364", password: "dogs"})
//     expect(res.statusCode).toBe(201)
// })

// test("add user", async () => {
//     const res = await supertest(server)
//     .post("/api/auth/register")
//     .send({username: "Dalton123456", password: "dogs"})
//     expect(res.body.username).toBe("Dalton12345")
// })

test("login code", async () => {
    const res = await supertest(server)
    .post("/api/auth/login")
    .send({username: "bob", password: "bobbert"})
    expect(res.statusCode).toBe(200)
})

test("login", async () => {
    const res = await supertest(server)
    .post("/api/auth/login")
    .send({username: "Dalton", password: "Walker"})
    expect(res.type).toBe("application/json")
})