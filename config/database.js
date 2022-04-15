const { createPool } = require("mysql");

const pool = createPool({
    port: 3306,
    host: "localhost",
    user: "reema",
    password: "Reema@123",
    database: "user_database",
    connectionLimit: 10
})

module.exports = pool
