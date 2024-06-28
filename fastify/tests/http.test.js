import { app } from "../index.js";

describe("HTTP", () => {
    it("should respond with Hello World", async () => {
        const response = await app.inject({
            method: "GET",
            url: "/"
        });
        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            status: "Okay",
            message: "Hello World!"
        });
    });
    it("should POST a name to / and response with 'Hello {name}'", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/",
            payload: {
                name: "John Doe"
            }
        });
        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            status: "Okay",
            message: "Hello John Doe!"
        });
    });
});