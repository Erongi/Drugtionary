const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/medical/:id", function (req, res, next) {
  // Query data from 3 tables
  const promise1 = pool.query("SELECT * FROM medicals WHERE id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM patients WHERE medical_id=?", [
    req.params.id,
  ]);

  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise1, promise2])
    .then((results) => {
      const [medicals, medicalsFields] = results[0];
      const [patients, patientsFields] = results[1];
      res.json({
        medical: medicals[0],
        patients: patients,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

exports.router = router;
