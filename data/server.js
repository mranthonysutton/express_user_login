const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.use("/", (req, res) => {
  res.json({ message: "API up and running..." });
});

server.use("/", (error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = server;
