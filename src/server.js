const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

const router = require("./router");

const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(router);

const server = app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.orq0g0n.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log(`Example app listening on port ${process.env.PORT}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});

const gracefulShutdown = () => {
  server.close(() => console.log("Server shutdown."));
  mongoose.disconnect();
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
