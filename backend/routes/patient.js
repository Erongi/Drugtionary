const express = require("express");
const pool = require("../config");
router = express.Router();

router.get("/patients", async function (req, res, next) {
  try {
    const search = req.query.search || "";
    let sql = "SELECT * FROM `patients`";
    let cond = [];
    if (search.length > 0) {
      sql = "SELECT * FROM `patients` WHERE name LIKE ? ;";
      cond = [`%${search}%`];
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/patient/:id", function (req, res, next) {
  // Query data from 3 tables
  const promise1 = pool.query("SELECT * FROM patients WHERE id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM history WHERE userId=?", [
    req.params.id,
  ]);

  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise1, promise2])
    .then((results) => {
      const [patients, patientsFields] = results[0];
      const [history, historyFields] = results[1];
      res.json({
        patients: patients[0],
        history: history,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

exports.router = router;
