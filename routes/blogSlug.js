/*
 * All routes for blogs are defined here
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/:slug", (req, res) => {
    db.query(`SELECT * FROM blogs WHERE slug = $1;`, [req.params.slug])
      .then(data =>
        res.json(data.rows)
      )
      .catch(err => {
        res
          .status(500)
          .json({ error: err });
      });
  });

  return router;
};



