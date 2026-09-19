const bcrypt = require("bcrypt");
const config = require("../config/env");

const hashPassword = (password) => bcrypt.hash(password, config.auth.bcryptSaltRounds);

const comparePassword = (password, passwordHash) => bcrypt.compare(password, passwordHash);

module.exports = {
  hashPassword,
  comparePassword,
};
