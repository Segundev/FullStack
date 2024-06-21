const url = "http://localhost:3000";

describe("GET /api/companies", () => {
    it("should get all companies", async () => {
        const response = await fetch(`${url}/api/companies`);
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toEqual([{ id: 1, name: 'Acme Inc', address: '123 Main St' },
        { id: 2, name: 'Widgets Inc', address: '456 Elm St' },
        { id: 3, name: 'Globex Corp', address: '789 Oak St' }]);
    });
});

describe("POST /api/company", () => {
    it("should create a new item", async () => {
        const response = await fetch(`${url}/api/company`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: 4, name: "10Layer", address: "Utrecht" }),
        });
        expect(response.status).toBe(201);
        const data = await response.json();
        expect(data).toEqual({ id: 4, name: "10Layer", address: "Utrecht" });
    });
    it("should return all items with item added", async () => {
        const response = await fetch(`${url}/api/companies`);
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toEqual([{ id: 1, name: 'Acme Inc', address: '123 Main St' },
        { id: 2, name: 'Widgets Inc', address: '456 Elm St' },
        { id: 3, name: 'Globex Corp', address: '789 Oak St' },
        { id: 4, name: '10Layer', address: 'Utrecht' }]);
    });
});

describe("DELETE/api/company/4", () => {
    it("should delete last item", async () => {
        const response = await fetch(`${url}/api/company/4`, {
            method: "DELETE",
        });
        expect(response.status).toBe(204);
    });
    it("should return all items with last item deleted", async () => {
        const response = await fetch(`${url}/api/companies`);
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toEqual([{ id: 1, name: 'Acme Inc', address: '123 Main St' },
        { id: 2, name: 'Widgets Inc', address: '456 Elm St' },
        { id: 3, name: 'Globex Corp', address: '789 Oak St' }]);
    });
})

describe("GET /api", () => {
    it("should return 200 OK", async () => {
        const response = await fetch(`${url}/api/`);
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toEqual({ message: "API is working" });
    });
});