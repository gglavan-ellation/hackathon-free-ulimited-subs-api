const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const healthCheck = require("express-healthcheck");
const cors = require("cors");

const router = require("./router");
const logger = require("./utils/logger");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use("/health", healthCheck());
app.use(
  "/.well-known/pki-validation/E94F136A8632D66044782868CF8F1973.txt",
  express.static(__dirname + "/cert/cert.txt")
);

console.log(__dirname + "/cert/cert.txt");

const server = app.listen(process.env.PORT, async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.orq0g0n.mongodb.net/?retryWrites=true&w=majority`
    );

    logger.info(`Server listening on port: ${process.env.PORT}`);
  } catch (e) {
    logger.error(e.message);
    process.exit(1);
  }
});

process.on("SIGINT", () => {
  mongoose.disconnect(() => logger.info("Database disconnect"));
  server.close(() => logger.info("Server shutdown"));
});
