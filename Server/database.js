const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "Divya2007",
    host: "localhost",
    port: 5432,
    database: "stitch_hive"
});


module.exports = pool;