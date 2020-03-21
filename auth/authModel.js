const db = require("../database/dbConfig")
const bcrypt = require("bcryptjs")

module.exports = {
    insert,
    findById,
    findBy
}

function findById(id) {
    return db("users")
    .where("id", id)
    .first()
}

async function insert(user) {
    user.password = await bcrypt.hash(user.password, 14)
    const [id] = await db("users").insert(user)
    return findById(id)
}

function findBy(filter){
   return db("users")
   .select("id", "username", "password")
   .where(filter)
}