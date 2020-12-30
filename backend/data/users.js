const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "Prashant Bhattarai",
    email: "prashant@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Sadhana Bhattarai",
    email: "sadhana@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
