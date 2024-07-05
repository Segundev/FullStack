const companies = (fastify, options, done) => {
  fastify.get("/companies", async (request, reply) => {
    const client = await fastify.pg.connect();
    const result = await client.query("SELECT company_name, company_address FROM company");
    reply.send(result.rows);
  });

  fastify.get("/company/:id", async (request, reply) => {
    const client = await fastify.pg.connect();
    const companyId = request.params.id;
    try {
      const result = await client.query(`SELECT company_name, company_address FROM company WHERE company_id= $1`, [
        companyId,
      ]);
      reply.send(result.rows);
    } finally {
      client.release();
    }
  });

  fastify.post("/company", async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { company_name, company_address } = request.body;
      const result = await client.query(
        "INSERT INTO company (company_name, company_address) VALUES($1, $2) RETURNING *",
        [company_name, company_address]
      );

      reply.send(result.rows[0]);
    } finally {
      client.release();
    }
  });

  fastify.put("/company/:id", async (request, reply) => {
    const client = await fastify.pg.connect();
    const companyId = request.params.id;
    try {
      const { company_name, company_address } = request.body;
      const result = await client.query(
        "UPDATE company SET company_name=$1, company_address=$2 WHERE company_id=$3 RETURNING *",
        [company_name, company_address, companyId]
      );

      reply.send(result.rows[0]);
    } finally {
      client.release();
    }
  });

  fastify.delete("/company/:id", async (request, reply) => {
    const client = await fastify.pg.connect();
    const companyId = request.params.id;
    try {
      const result = await client.query(`DELETE FROM company WHERE company_id= $1`, [companyId]);
      reply.send(result.rows[0]);
    } finally {
      client.release();
    }
  });

  done();
};

export default companies;
