const jwt = require("jsonwebtoken");
const {} = require("dotenv");

const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

module.exports = genToken;