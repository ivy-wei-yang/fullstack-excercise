import request from "supertest";

import { ConnectionFactory, getRepository, customer1, customer2 } from "../__stubs__/ConnectionFactory";

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
const customerJson = JSON.stringify(customer1);

describe("GET /customers", () => {
    it("should return 200 OK with an array", (done) => {
        request(app)
            .get("/customers")
            .expect("Content-Type", /json/)
            .expect(200, JSON.stringify([customer1, customer2]), done);
    });
    it("should return 200 OK with filtered array if query status is current", (done) => {
        request(app)
            .get("/customers?filter=status=current")
            .expect("Content-Type", /json/)
            .expect(200, JSON.stringify([customer1, customer2]), done);
    });
    it("should return 200 OK with filtered array if query status is propsective", (done) => {
        request(app)
            .get("/customers?filter=status=prospective")
            .expect("Content-Type", /json/)
            .expect(200, [], done);
    });
    it("should return 200 OK with sorted array if query status is current, and sort phone is ASC", (done) => {
        request(app)
            .get("/customers?filter=status=current&sort=phone=ASC")
            .expect("Content-Type", /json/)
            .expect(200, JSON.stringify([customer2, customer1]), done);
    });
    it("should return 200 OK with sorted array if query status is current, and sort phone is DESC", (done) => {
        request(app)
            .get("/customers?filter=status=current&sort=phone=DESC")
            .expect("Content-Type", /json/)
            .expect(200, JSON.stringify([customer1, customer2]), done);
    });
    it("should return 400 Bad Request if query status is invalid", (done) => {
        request(app)
            .get("/customers?filter=status=errorStatus&sort=phone=DESC")
            .expect(400, "Invalid status, please check.", done);
    });
    it("should return 400 Bad Request if sort phone order is invalid", (done) => {
        request(app)
            .get("/customers?filter=status=current&sort=phone=errorOrder")
            .expect(400, "Invalid order, please check.", done);
    });
});

describe("GET /customers/:id", () => {
    it("should return 200 OK with value", (done) => {
        request(app)
            .get("/customers/1f6e3fa7-7761-4b55-a694-3e22b7e485fd")
            .expect("Content-Type", /json/)
            .expect(200, customerJson, done);
    });

    it("should return 404 if customer is not found", (done) => {
        request(app)
            .get("/customers/38cff958-e818-11e9-81b4-2a2ae2dbcce4")
            .expect(404, "Customer with id: 38cff958-e818-11e9-81b4-2a2ae2dbcce4 not found", done);
    });
});

describe("PATCH /customers/:id status", () => {
    it("should return 200 OK with value", (done) => {
        request(app)
            .patch("/customers/1f6e3fa7-7761-4b55-a694-3e22b7e485fd")
            .send({
                status: "prospective"
            })
            .expect("Content-Type", /json/)
            .expect(200, customerJson, done);
    });

    it("should return 304 Not Modified if status is not changed", (done) => {
        request(app)
            .patch("/customers/1f6e3fa7-7761-4b55-a694-3e22b7e485fd")
            .send({
                status: "current"
            })
            .expect(304, done);
    });

    it("should return 400 Bad Request if query status is invalid", (done) => {
        request(app)
            .patch("/customers/1f6e3fa7-7761-4b55-a694-3e22b7e485fd")
            .send({
                status: "errorStatus"
            })
            .expect(400, "Invalid status, please check.", done);
    });
});
