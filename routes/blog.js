/*
 * All routes for blogs are defined here
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {//user
    db.query(`SELECT * FROM blogs;`)
      .then(data =>
        res.json(data.rows)
      )
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};



