const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

const isOwner = async (req, res, next) => {
  if (req.params.id != req.user.id) {
    return res.status(403).send("You dont have permision. XD");
  }
  return next();
};

router.get("/note/:id", isLoggedIn, isOwner, async function (req, res, next) {
  try {
    const [note] = await pool.query(
      "SELECT * FROM `note` WHERE `user_id` = ?",
      [req.params.id]
    );
    return res.json({ note: note });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/note/:id", isLoggedIn, isOwner, async function (req, res, next) {
  if (req.method == "POST") {
    const message = req.body.message;
    const type = req.body.type;

    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    try {
      const [
        rows1,
        fields1,
      ] = await conn.query(
        "INSERT INTO `note` (`user_id`, `message`, `type`) VALUES(?, ?, ?)",
        [req.params.id, message, type]
      );

      const [
        rows2,
        fields2,
      ] = await conn.query("SELECT * FROM `note` WHERE `id` = ?", [
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

router.delete("/note/:noteId", isLoggedIn, async function (req, res, next) {
  try {
    await pool.query("DELETE FROM `note` WHERE id =? ", [req.params.noteId]);
    res.json({ id: req.params.noteId });
  } catch (err) {
    return res.json(err);
  }
});

exports.router = router;
