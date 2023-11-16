const express = require("express");
const app = express();
let port = "8080";

const path = require("path");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

const mysql = require("mysql2");

// create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "insta_app",
  password: "mysql@123",
});

// GET / route
app.get("/", (req, res) => {
  let q = "SELECT COUNT(id) FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      //res.send(result);
      let count = result[0]["COUNT(id)"];
      console.log("count: ", count);
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("error in DB");
  }
});

app.get("/user", (req, res) => {
  let q = "SELECT id, username, email FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //res.send(result);
      res.render("showusers.ejs", { result });
    });
  } catch (err) {
    console.log(err);
    res.send("error in DB");
  }
});

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log("id: ", id);
  let q = `SELECT * FROM user WHERE id = "${id}" `;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("error in DB");
  }
});

app.patch("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { username, password } = req.body;
  console.log("new data submitted------>", username + " " + password);

  let q = `SELECT * FROM user WHERE id = "${id}" `;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      let user = result[0];
      console.log("data from database------>>>", user.username, user.password);
      if (user.password == password) {
        let q2 = `UPDATE user SET username = "${username}" WHERE id="${id}"`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          console.log("result ------>", result);
          res.redirect("/user");
        });
      } else {
        res.send("wrong password");
      }
    });
  } catch (err) {
    console.log(err);
    res.send("error in DB");
  }
});

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
