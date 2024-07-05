import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";

import users from "./src/users-controller.js";
import companies from "./src/companies-controller.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// use default logger
const opts = {
  logger: true,
};

// use pino-pretty
if (process.stdout.isTTY) {
  opts.logger = { transport: { target: "pino-pretty" } };
}

// instantiate fastify app
const app = Fastify(opts);

// connect to postgres database
/* app.register(fastifyPostgres, {
  connectionString: `postgres://postgres:mysecretpassword@localhost:5500/fastify_db`,
}); */

app.register(fastifyPostgres, {
  connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
});

// register users controllers API route
app.register(users, { prefix: "/api" });

// register companies controllers API route
app.register(companies, { prefix: "/api" });

app.listen({ port: 3001 });
