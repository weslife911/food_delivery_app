const { connect } = require("mongoose");
const { config } = require("dotenv");

config();

const connectToDB = async() => {
    await connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongo DB connected successfully"))
    .catch((e => console.log(e)));
};

module.exports = connectToDB;