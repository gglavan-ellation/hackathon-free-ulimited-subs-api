const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

const router = require("./router");
const logger = require("./utils/logger");

const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(router);

const server = app.listen(process.env.PORT, async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.orq0g0n.mongodb.net/?retryWrites=true&w=majority`
    );

    logger.warn(`Server listening on port ${process.env.PORT}`);
  } catch (e) {
    logger.error(e.message);
    process.exit(1);
  }
});

const gracefulShutdown = () => {
  mongoose.disconnect(() => logger.info("Database disconnect"));
  server.close(() => logger.info("Server shutdown"));
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
