import Fastify from "fastify";

export const app = Fastify({
    logger: true
});

app.get("/", (req, res) => {
    res.send({
        status: "Okay",
        message: "Hello World!"
    });
});

app.post("/", (req, res) => {
    res.send({
        status: "Okay",
        message: `Hello ${req.body.name}!`
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen({ port: 3000 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}