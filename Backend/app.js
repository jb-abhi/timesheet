const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv/config");
const errorHandler = require("./helpers/errorhandler");
const mongoose = require("mongoose");
const cors = require("cors");

const api = process.env.API_URL;

const authJwt = require("./helpers/jwt");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(authJwt());
app.use(express.json());
app.use(morgan("tiny"));
app.use(errorHandler);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database connection is ready..");
  })
  .catch((err) => {
    console.log(err);
  });

const usersRoutes = require("./routes/users");
const tasksRoutes = require("./routes/tasks");

app.use(`${api}/users`, usersRoutes);
app.use(`${api}/tasks`, tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
