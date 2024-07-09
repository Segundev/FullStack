// This is the schema for a POST REQUEST body needed for validating incoming data
const schemaPostBody = {
  body: {
    properties: {
      username: { type: "string" },
      email: { type: "string", format: "email" },
      company_id: { type: "integer" },
    },
    required: ["username", "email", "company_id"],
  },
};

const users = (fastify, options, done) => {
  fastify.get("/users", async (request, reply) => {
    const client = await fastify.pg.connect();
    const result = await client.query(
      "SELECT users.user_id, users.username, users.email, users.company_id, company.company_name FROM users INNER JOIN company ON users.company_id = company.company_id"
    );
    reply.send(result.rows);
  });

  fastify.get("/user/:id", async (request, reply) => {
    const client = await fastify.pg.connect();
    const userId = request.params.id;
    try {
      const result = await client.query(`SELECT username, email FROM users WHERE user_id= $1`, [userId]);
      reply.send(result.rows);
    } finally {
      client.release();
    }
  });

  fastify.post("/user", { schema: schemaPostBody }, async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { username, email, company_id } = request.body;
      const result = await client.query(
        "INSERT INTO users (username, email, company_id) VALUES($1, $2, $3) RETURNING *",
        [username, email, company_id]
      );

      reply.send(result.rows[0]);
    } finally {
      client.release();
    }
  });

  fastify.put("/user/:id", async (request, reply) => {
    const client = await fastify.pg.connect();
    const userId = request.params.id;
    try {
      const { username, email, company_id } = request.body;
      const result = await client.query(
        "UPDATE users SET username=$1, email=$2, company_id=$3 WHERE user_id=$4 RETURNING *",
        [username, email, company_id, userId]
      );

      reply.send(result.rows[0]);
    } finally {
      client.release();
    }
  });

  fastify.delete("/user/:id", async (request, reply) => {
    const client = await fastify.pg.connect();
    const userId = request.params.id;
    try {
      const result = await client.query(`DELETE FROM users WHERE user_id= $1`, [userId]);
      reply.send(result.rows[0]);
    } finally {
      client.release();
    }
  });

  done();
};

export default users;
