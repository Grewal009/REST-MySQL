const express = require("express");
const app = express();
let port = "8080";

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
