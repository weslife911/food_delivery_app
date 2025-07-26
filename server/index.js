const express = require("express");
const { config } = require("dotenv");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/AuthRoutes");
const cors = require("cors");

config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", authRoutes);

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
    connectToDB();
});