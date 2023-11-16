const { faker } = require("@faker-js/faker");

const mysql = require("mysql2");

// create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "insta_app",
  password: "mysql@123",
});

const randomdata = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
let data = [];

for (let i = 1; i <= 100; i++) {
  data.push(randomdata());
}

// query
// let q = `SELECT * FROM user`;
let q = `INSERT INTO user VALUES ?`;

try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log("result: ", result);
  });
} catch (err) {
  console.log(err);
}

// close connection
connection.end();
