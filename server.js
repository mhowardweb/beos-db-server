// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  logger: false
});

// Require external modules
const mongoose = require("mongoose");

// Import Environment
require("dotenv").config();

/// Connect to MLab Database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

module.exports = fastify;
