const express = require("express");
const pool = require("../config");
const { isLoggedIn, isMedical } = require("../middlewares");
router = express.Router();

const permisionProfile = async (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  if (req.user.role === "medical") {
    return next();
  }
  if (req.params.id != req.user.id) {
    return res.status(403).send("You dont have permision. XD");
  }
  return next();
};

router.get("/symptom/:userId", isLoggedIn, async function (req, res, next) {
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

router.post(
  "/symptom/:id",
  isLoggedIn,
  isMedical,
  async function (req, res, next) {
    if (req.method == "POST") {
      const description = req.body.description;
      const user_id = req.params.id;
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
  }
);

router.delete(
  "/symptom/:symptom_id",
  isLoggedIn,
  isMedical,
  async function (req, res, next) {
    try {
      await pool.query("DELETE FROM `symptoms` WHERE id = ? ", [
        req.params.symptom_id,
      ]);
      res.json({ id: req.params.symptom_id });
    } catch (err) {
      return res.json(err);
    }
  }
);

exports.router = router;
