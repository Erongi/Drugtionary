const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares");
router = express.Router();

router.get("/symptoms", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM `symptoms`");
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/symptom/:userId", async function (req, res, next) {
  try {
    const [
      symptoms,
    ] = await pool.query("SELECT * FROM `symptoms` WHERE `user_id` = ?", [
      req.params.userId,
    ]);
    return res.json({ symptoms: symptoms });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/symptom/:id", isLoggedIn, async function (req, res, next) {
  if (req.method == "POST") {
    const description = req.body.description;
    const user_id = req.body.user_id;
    const create_by = req.body.create_by;

    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    try {
      const [
        rows1,
        fields1,
      ] = await conn.query(
        "INSERT INTO `symptoms` (`description`,`user_id`, `create_by`) VALUES(?, ?,?)",
        [description, user_id, create_by]
      );

      const [
        rows2,
        fields2,
      ] = await conn.query("SELECT * FROM `symptoms` WHERE `id` = ?", [
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
