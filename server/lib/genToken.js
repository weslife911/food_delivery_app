const jwt = require("jsonwebtoken");
const {} = require("dotenv");

const genToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    });
};

module.exports = genToken;