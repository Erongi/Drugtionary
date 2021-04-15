const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/note/:id", function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM `ct` WHERE userId=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM `ipt` WHERE userId=?", [
    req.params.id,
  ]);
  const promise3 = pool.query("SELECT * FROM `npt` WHERE userId=?", [
    req.params.id,
  ]);
  const promise4 = pool.query("SELECT * FROM `tdt` WHERE userId=?", [
    req.params.id,
  ]);
  Promise.all([promise1, promise2, promise3, promise4])
    .then((results) => {
      const [ct, ctFields] = results[0];
      const [ipt, iptFields] = results[1];
      const [npt, nptFields] = results[2];
      const [tdt, tdtFields] = results[3];
      res.json({
        ct: ct,
        ipt: ipt,
        npt: npt,
        tdt: tdt,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.post("/note/ct/:id", async function (req, res, next) {
  if (req.method == "POST") {
    const message = req.body.message;
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    try {
      const [
        rows1,
        fields1,
      ] = await conn.query(
        "INSERT INTO `ct` (`userId`, `message`) VALUES(?, ?)",
        [req.params.id, req.body.message]
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

router.post("/note/ipt/:id", async function (req, res, next) {
  if (req.method == "POST") {
    const message = req.body.message;
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    try {
      const [
        rows1,
        fields1,
      ] = await conn.query(
        "INSERT INTO `ipt` (`userId`, `message`) VALUES(?, ?)",
        [req.params.id, req.body.message]
      );

      const [
        rows2,
        fields2,
      ] = await conn.query("SELECT * FROM `ipt` WHERE `id` = ?", [
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

router.post("/note/tdt/:id", async function (req, res, next) {
  if (req.method == "POST") {
    const message = req.body.message;
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    try {
      const [
        rows1,
        fields1,
      ] = await conn.query(
        "INSERT INTO `tdt` (`userId`, `message`) VALUES(?, ?)",
        [req.params.id, req.body.message]
      );

      const [
        rows2,
        fields2,
      ] = await conn.query("SELECT * FROM `tdt` WHERE `id` = ?", [
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

router.post("/note/npt/:id", async function (req, res, next) {
  if (req.method == "POST") {
    const message = req.body.message;
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
    try {
      const [
        rows1,
        fields1,
      ] = await conn.query(
        "INSERT INTO `npt` (`userId`, `message`) VALUES(?, ?)",
        [req.params.id, req.body.message]
      );

      const [
        rows2,
        fields2,
      ] = await conn.query("SELECT * FROM `npt` WHERE `id` = ?", [
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

router.delete("/note/ct/:noteId", async function (req, res, next) {
  try {
    await pool.query("DELETE FROM `ct` WHERE id =? ", [req.params.noteId]);
    res.json({ id: req.params.noteId });
  } catch (err) {
    return res.json(err);
  }
});

exports.router = router;
