require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const router = require("./src/routes/walletRoutes");
const { testDbConnection } = require("./src/config/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
testDbConnection();

const port = process.env.PORT;

app.use(cors());
app.use(logger("dev"));
app.use("/wallet", router);

app.listen(port, () => console.log("Application started successfuly"));
