const Pool = require("pg").Pool;
//require("dotenv").config;
// local path to .env, irrelevant for render.com
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// create connection to postgres db, pg connection env variables configured on render.com
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

module.exports = pool;
