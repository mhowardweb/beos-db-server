// Import Server
const fastify = require("./server.js");

// Import external dependancies
const gql = require("fastify-gql");

// Import GraphQL Schema
const schema = require("./schema");

// Register Fastify CORS
fastify.register(require("fastify-cors"), {
  // put your options here
});

// Register Fastify GraphQL
fastify.register(gql, {
  schema,
  graphiql: true
});

// Run the server!
// You need to set process.env.PORT for heroku to set the port dynamically
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 4000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
