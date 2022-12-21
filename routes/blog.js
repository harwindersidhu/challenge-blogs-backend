/*
 * All routes for blogs are defined here
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/:page", (req, res) => {
    const rowsToSkip = req.params.page * 6 - 6;
    db.query(`SELECT * FROM blogs WHERE published_at IS NOT NULL ORDER BY published_at DESC OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY;`, [rowsToSkip, 6])
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



