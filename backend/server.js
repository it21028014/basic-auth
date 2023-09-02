const express = require("express");
const env = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use("/api/goals", require("./goalsRoutes"));

app.listen(port, () => console.log(`Server started in the port ${port}`));
