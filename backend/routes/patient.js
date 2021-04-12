const express = require("express");
const pool = require("../config");
const path = require("path");

router = express.Router();

// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/patients");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

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

router.post(
  "/patients",
  upload.single("myImage"),
  async function (req, res, next) {
    if (req.method == "POST") {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
      }

      const name = req.body.name;
      const gender = req.body.gender;
      const age = req.body.age;
      const symptom = req.body.symptom;

      const conn = await pool.getConnection();
      // Begin transaction
      await conn.beginTransaction();

      try {
        console.log(file.path.substr(6));
        await conn.query(
          "INSERT INTO patients(`name`, `gender`, `age`, `image`, `symptom`) VALUES(?, ?, ?, ?, ?);",
          [name, gender, age, file.path.substr(6), symptom]
        );
        await conn.commit();
        res.send("add patient success!");
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
