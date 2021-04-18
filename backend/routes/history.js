const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/history", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM `history`");
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/history/:drugId", async function (req, res, next) {
  if (req.method == "POST") {
    const drug_name = req.body.drug_name;
    const date = req.body.date;
    const time = req.body.time;
    const amount = req.body.amount;
    const type = req.body.type;
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    try {
      const [
        rows1,
        fields1,
      ] = await conn.query(
        "INSERT INTO `history` (`patient_id`, `drug_id`, `drug_name`, `date`, `time`, `amount`, `type`) VALUES(?, ?,?, ?,?, ?,? )",
        [1, req.params.drugId, drug_name, date, time, amount, type]
      );

      const [
        rows2,
        fields2,
      ] = await conn.query("SELECT * FROM `ct` WHERE `id` = ?", [
        rows1.insertId,
      ]);
      await conn.commit();
      return res.json(rows2[0]);
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  }
});

exports.router = router;
