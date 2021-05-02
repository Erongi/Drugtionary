const express = require("express");
const pool = require("../config");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const path = require("path");

const { generateToken } = require("../utils/token");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/user");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const passwordValidator = (value, helpers) => {
  if (value.length < 8) {
    throw new Joi.ValidationError(
      "Password must contain at least 8 characters"
    );
  }
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    throw new Joi.ValidationError("Password must be harder");
  }
  return value;
};

const usernameValidator = async (value, helpers) => {
  const [
    rows,
    _,
  ] = await pool.query("SELECT username FROM users WHERE username = ?", [
    value,
  ]);
  if (rows.length > 0) {
    const message = "This username is already taken";
    throw new Joi.ValidationError(message, { message });
  }
  return value;
};

const emailValidator = async (value, helpers) => {
  const [rows, _] = await pool.query(
    "SELECT email FROM users WHERE email = ?",
    [value]
  );
  if (rows.length > 0) {
    const message = "This email is already taken";
    throw new Joi.ValidationError(message, { message });
  }
  return value;
};

const signupSchema = Joi.object({
  email: Joi.string().required().email().external(emailValidator),
  mobile: Joi.string()
    .required()
    .pattern(/0[0-9]{9}/),
  first_name: Joi.string().required().max(150),
  age: Joi.string()
    .required()
    .pattern(/[0-9]{1,3}/),
  last_name: Joi.string().required().max(150),
  gender: Joi.string().required().valid("ชาย", "หญิง"),
  password: Joi.string().required().custom(passwordValidator),
  confirm_password: Joi.string().required().valid(Joi.ref("password")),
  username: Joi.string().required().min(5).max(20).external(usernameValidator),
});

const editProfileSchema = Joi.object({
  mobile: Joi.string()
    .required()
    .pattern(/0[0-9]{9}/),
  first_name: Joi.string().required().max(150),
  age: Joi.string()
    .required()
    .pattern(/[0-9]{1,3}/),
  last_name: Joi.string().required().max(150),
  gender: Joi.string().required().valid("ชาย", "หญิง"),
});

router.post(
  "/user/signup",
  upload.single("myImage"),
  async (req, res, next) => {
    try {
      await signupSchema.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).send(err);
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 5);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const gender = req.body.gender;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const file = req.file;

    try {
      await conn.query(
        "INSERT INTO users(username, password, first_name, last_name, email, mobile, age, gender, picture) VALUES (?, ?, ?, ?, ?, ?,?,?,?)",
        [
          username,
          password,
          first_name,
          last_name,
          email,
          mobile,
          age,
          gender,
          file.path.substr(6),
        ]
      );
      conn.commit();
      res.status(201).send();
    } catch (err) {
      conn.rollback();
      res.status(400).json(err.toString());
    } finally {
      conn.release();
    }
  }
);

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post("/user/login", async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).send(err);
  }
  const username = req.body.username;
  const password = req.body.password;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // Check if username is correct
    const [[user]] = await conn.query("SELECT * FROM users WHERE username=?", [
      username,
    ]);

    if (!user) {
      throw new Error("Incorrect username or password");
    }

    // Check if password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Incorrect username or password");
    }

    // Check if token already existed
    const [tokens] = await conn.query("SELECT * FROM tokens WHERE user_id=?", [
      user.id,
    ]);
    let token = tokens[0]?.token;
    if (!token) {
      // Generate and save token into database
      token = generateToken();
      await conn.query("INSERT INTO tokens(user_id, token) VALUES (?, ?)", [
        user.id,
        token,
      ]);
    }

    conn.commit();
    res.status(200).json({ token: token });
  } catch (error) {
    conn.rollback();
    res.status(400).json(error.toString());
  } finally {
    conn.release();
  }
});

router.get("/user/me", isLoggedIn, async (req, res, next) => {
  res.json(req.user);
});

router.get("/user/:id", async function (req, res, next) {
  try {
    const [
      rows,
      fields,
    ] = await pool.query(
      "SELECT `id`,`username`,`first_name`,`last_name`,`age`,`gender`,`role`,`email`,`picture`,`mobile` FROM `users` WHERE `id` = ?",
      [req.params.id]
    );
    return res.json({ user: rows[0] });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put(
  "/user/editProfile",
  isLoggedIn,
  upload.single("myImage"),

  async function (req, res, next) {
    try {
      await editProfileSchema.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).send(err);
    }
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const file = req.file;

    try {
      await conn.query(
        "UPDATE `users` SET `first_name` = ?,`last_name` = ?,`age` = ?,`gender` = ?,`mobile` = ?,`picture` = ?  WHERE `id` = ?",

        [
          first_name,
          last_name,
          age,
          gender,
          mobile,
          file.path.substr(6),
          req.user.id,
        ]
      );
      await conn.commit();
      res.json("whatttt");
    } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  }
);

exports.router = router;
