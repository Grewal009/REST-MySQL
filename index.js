const { faker } = require("@faker-js/faker");
const randomdata = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
    faker.image.avatar(),
  ];
};

console.log(randomdata());
