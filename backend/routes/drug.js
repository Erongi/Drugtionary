const express = require("express");
const pool = require("../config");
router = express.Router();

router.get("/drugs", async function (req, res, next) {
  try {
    const search = req.query.search || "";
    let sql = "SELECT * FROM `drugs`";
    let cond = [];
    if (search.length > 0) {
      sql = "SELECT * FROM `drugs` WHERE name LIKE ? ;";
      cond = [`%${search}%`];
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/drug/:id", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM drugs WHERE id=?", [
      req.params.id,
    ]);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

exports.router = router;
