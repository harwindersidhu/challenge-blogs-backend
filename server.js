//load .env data into process.env
require("dotenv").config({debug: true});

// Web server config
const PORT = 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");

// PG database client/connection setup
const { Pool } = require("pg");
const db = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: true
});
db.connect();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const blogRoutes = require("./routes/blog");
const slugRoutes = require("./routes/blogSlug");

app.use(bodyparser.json());
app.use("/api/blogs", blogRoutes(db));
app.use("/api/blogs/slug", slugRoutes(db));

// Just to check if express is working
app.get("/", (req, res) => {
  res.send("this is working just alright");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
