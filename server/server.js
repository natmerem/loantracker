//require("dotenv").config();
// local path to .env, irrelevant for render.com
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
// prevent cors errors, request origin mismatch
const cors = require("cors");
// unique id for primary keys
const { v4: uuidv4 } = require("uuid");
// create db connection in db.js, import and do queries here
const db = require("./db");
// password hashing with bcrypt
const bcrypt = require("bcrypt");
// jsonwebtoken to authorize logged in user access
const jwt = require("jsonwebtoken");
// add express methods and features to app
const express = require("express");
const app = express();

// middleware, prevent request origin mismatch errors and render json data properly
app.use(cors());
app.use(express.json());

// gets the static files from the build folder
const buildPath = path.join(__dirname, "../client/build");
app.use(express.static(buildPath));
app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// get all loans
app.get("/loans/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const loans = await db.query("SELECT * FROM loans WHERE user_email = $1", [
      userEmail,
    ]);
    res.json(loans.rows);
  } catch (err) {
    console.log(err);
  }
});

// create a new loan
app.post("/loans", async (req, res) => {
  const { user_email, loan_name, loan_type, progress, notes } = req.body;
  console.log(user_email, loan_name, loan_type, progress, notes);
  const id = uuidv4();
  try {
    const newLoan = await db.query(
      "INSERT INTO loans (id, user_email, loan_name, loan_type, progress, notes) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, user_email, loan_name, loan_type, progress, notes]
    );
    res.json(newLoan);
  } catch (err) {
    console.error(err);
  }
});

// edit a loan
app.put("/loans/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, loan_name, loan_type, progress, notes } = req.body;
  //console.log(user_email, loan_name, loan_type, progress, notes);
  try {
    const editLoan = await db.query(
      "UPDATE loans SET user_email = $1, loan_name = $2, loan_type = $3, progress = $4, notes = $5 WHERE id = $6",
      [user_email, loan_name, loan_type, progress, notes, id]
    );
    res.json(editLoan);
  } catch (err) {
    console.error(err);
  }
});

// delete a loan
app.delete("/loans/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteLoan = await db.query("DELETE FROM loans WHERE id = $1", [id]);
    res.json(deleteLoan);
  } catch (err) {
    console.error(err);
  }
});

// sign up
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user_id = uuidv4();

  try {
    const signup = await db.query(
      "INSERT INTO users (user_id, email, hashed_pw) VALUES ($1, $2, $3)",
      [user_id, email, hashedPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
});

// sign in
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!users.rows.length) return res.json({ detail: "User does not exist" });

    const success = await bcrypt.compare(password, users.rows[0].hashed_pw);
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (success) {
      res.json({ email: users.rows[0].email, token: token });
    } else {
      res.json({ detail: "login failed" });
    }
  } catch (err) {
    console.error(err);
  }
});

// render.com specifically expects server to run on port 10000
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
