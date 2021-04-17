const express = require("express");
const pool = require("../config");
const path = require("path");

router = express.Router();

// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/drugs");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

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

router.post(
  "/drugs",
  upload.single("myImage"),
  async function (req, res, next) {
    if (req.method == "POST") {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
      }

      const name = req.body.name;
      const group = req.body.group;
      const type = req.body.type;
      const properties = req.body.properties;
      const patient_group = req.body.pg;
      const pattern = req.body.pattern;

      const conn = await pool.getConnection();
      // Begin transaction
      await conn.beginTransaction();

      try {
        console.log(file.path.substr(6));
        await conn.query(
          "INSERT INTO drugs(`name`, `group`, `type`, `properties`, `patient_group`, `pattern`, `image`) VALUES(?, ?, ?, ?, ?, ?, ?);",
          [
            name,
            group,
            type,
            properties,
            patient_group,
            pattern,
            file.path.substr(6),
          ]
        );
        await conn.commit();
        res.send("add drug success!");
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

exports.router = router;
