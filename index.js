const { faker } = require("@faker-js/faker");

const mysql = require("mysql2");

// create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "insta_app",
  password: "mysql@123",
});

// query
let q = `SELECT * FROM user`;

try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    console.log("result: ", result);
  });
} catch (err) {
  console.log(err);
}

// close connection
connection.end();

const randomdata = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
    faker.image.avatar(),
  ];
};

// console.log(randomdata());
