/*
 * All routes for blogs are defined here
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {//user
    db.query(`SELECT * FROM blogs WHERE published_at IS NOT NULL ORDER BY published_at DESC LIMIT $1;`, [6])
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



