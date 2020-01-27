import request from "supertest";

import { ConnectionFactory, getRepository, note1, note2 } from "../__stubs__/ConnectionFactory";

jest.mock("../../db/ConnectionFactory", () => ({
    ConnectionFactory,
    getRepository
}));
/* Has to place ConnectionFactory mock before below imports */
/* eslint-disable */
import app from "../../app";
import { errorHandler } from "../errorHandler";
/* eslint-enable */

// Error Handler
app.use(errorHandler);
const note1Json = JSON.stringify(note1);

describe("GET /customers/:id/notes", () => {
    it("should return 200 OK with an array", (done) => {
        request(app)
            .get("/customers/1f6e3fa7-7761-4b55-a694-3e22b7e485fd/notes")
            .expect("Content-Type", /json/)
            .expect(200, JSON.stringify([note1, note2]), done);
    });
    it("should return 404 Not found if the customer does not exist", (done) => {
        request(app)
            .get("/customers/1f6e3fa7-7761-4b55-a694-3e22b7e-BADID/notes")
            .expect(404, "Customer with id: 1f6e3fa7-7761-4b55-a694-3e22b7e-BADID not found", done);
    });
});

describe("POST /customers/:id/notes", () => {
    it("should return 201 CREATED with note", (done) => {
        request(app)
            .post("/customers/1f6e3fa7-7761-4b55-a694-3e22b7e485fd/notes")
            .send({ text: "abc" })
            .expect("Content-Type", /json/)
            .expect(201, note1Json, done);
    });
});

describe("PATCH /notes/:noteId", () => {
    it("should return 200 OK with note", (done) => {
        request(app)
            .patch("/notes/fd45030a-b416-484a-9138-bfbbd6f7876f")
            .send({ text: "abc" })
            .expect("Content-Type", /json/)
            .expect(200, note1Json, done);
    });

    it("should return 404 if note is not found", (done) => {
        request(app)
            .patch("/notes/38cff958-e818-11e9-81b4-2a2ae2dbcce4")
            .send({ text: "abc" })
            .expect(404, "Note with id: 38cff958-e818-11e9-81b4-2a2ae2dbcce4 not found", done);
    });
});

describe("DELETE /notes/:noteId", () => {
    it("should return 204 No Content", (done) => {
        request(app)
            .delete("/notes/fd45030a-b416-484a-9138-bfbbd6f7876f")
            .expect(204, done);
    });

    it("should return 404 if note is not found", (done) => {
        request(app)
            .delete("/notes/38cff958-e818-11e9-81b4-2a2ae2dbcce4")
            .expect(404, "Note with id: 38cff958-e818-11e9-81b4-2a2ae2dbcce4 not found", done);
    });
});
