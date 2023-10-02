const express = require("express");

const colors = require("colors");

const env = require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

//connect the DB
connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started in the port ${port}`));
