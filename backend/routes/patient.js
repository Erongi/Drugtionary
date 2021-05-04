const express = require("express");
const pool = require("../config");
const path = require("path");
const { isLoggedIn } = require("../middlewares");
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

router.get(
  "/patients",
  isLoggedIn,
  permisionProfile,
  async function (req, res, next) {
    try {
      const search = req.query.search || "";
      let sql =
        "SELECT `id`, `username`, `first_name`, `last_name`, `age`,`gender`, `picture`, `mobile`, `email` FROM `users` WHERE `role`= 'patient'";
      let cond = [];
      if (search.length > 0) {
        sql =
          "SELECT `id`, `username`, `first_name`, `last_name`, `age`,`gender`, `picture`, `mobile`, `email` FROM `users` " +
          "WHERE `role`= 'patient' AND (`first_name` LIKE ? OR `last_name` LIKE ?) ;";
        cond = [`%${search}%`, `%${search}%`];
      }
      const [rows, fields] = await pool.query(sql, cond);
      return res.json(rows);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.get(
  "/patient/:id",
  isLoggedIn,
  permisionProfile,
  function (req, res, next) {
    // Query data from 3 tables
    const promise1 = pool.query(
      "SELECT `id`, `username`, `first_name`, `last_name`, `age`,`gender`, `picture`, `mobile`, `email` FROM users WHERE id=?",
      [req.params.id]
    );
    const promise2 = pool.query("SELECT * FROM history WHERE patient_id=?", [
      req.params.id,
    ]);
    const promise3 = pool.query("SELECT * FROM patients WHERE user_id=?", [
      req.params.id,
    ]);
    const promise4 = pool.query("SELECT * FROM symptoms WHERE user_id=?", [
      req.params.id,
    ]);

    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1, promise2, promise3, promise4])
      .then((results) => {
        const [users, usersFields] = results[0];
        const [history, historyFields] = results[1];
        const [patients, patientsFields] = results[2];
        const [symptoms, symptomsFields] = results[3];

        res.json({
          users: users[0],
          history: history,
          patients: patients[0],
          symptoms: symptoms,
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
);

router.put("/patient/pair/:id", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [
      [patient],
    ] = await conn.query("SELECT * FROM patients WHERE user_id=?", [
      req.params.id,
    ]);

    if (!patient) {
      await conn.query(
        "INSERT INTO patients(user_id, medical_id) VALUES (?, ?)",
        [req.params.id, req.user.id]
      );
    }
    await conn.query(
      "UPDATE `patients` SET `medical_id` = ? WHERE `user_id` = ?",
      [req.user.id, req.params.id]
    );
    await conn.commit();
    const [
      medicals,
      medicalsFields,
    ] = await conn.query(
      "SELECT `id`,`username`,`first_name`,`last_name`,`age`,`gender`,`role`,`email`,`picture`,`mobile` FROM `users` WHERE id=?",
      [req.user.id]
    );
    res.json({ medical: medicals[0] });
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});

router.put("/patient/delPair/:id", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      "UPDATE `patients` SET `medical_id` = null WHERE `user_id` = ?",
      [req.params.id]
    );
    await conn.commit();
    res.json({ medicals: {} });
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});
router.get("/patient/pair/:medical_id", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let patients = [];
    const [
      patient_id,
    ] = await conn.query(
      "SELECT `user_id` FROM `patients` WHERE `medical_id` = ?",
      [req.params.medical_id]
    );
    for (i = 0; i < patient_id.length; i++) {
      const [
        [patient],
      ] = await conn.query(
        "SELECT `id`,`username`,`first_name`,`last_name`,`age`,`gender`,`picture`,`mobile` FROM `users` WHERE `id` = ?",
        [patient_id[i].user_id]
      );
      patients.push(patient);
    }
    await conn.commit();
    res.json({ patients: patients });
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});

exports.router = router;
