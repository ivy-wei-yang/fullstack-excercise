import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

// Route handlers
import { getAllCustomers, getCustomerById, updateCustomerStatus } from "./api/customers";
import { getAllNotesByCustomerId, createNote, updateNote, deleteNote } from "./api/notes";

import { ConnectionFactory } from "./db/ConnectionFactory";
import swaggerDoc from "./swagger.json";

// DB initialise
ConnectionFactory.init();

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.get("/customers", getAllCustomers);
app.get("/customers/:id", getCustomerById);
app.patch("/customers/:id", updateCustomerStatus);
app.get("/customers/:id/notes", getAllNotesByCustomerId);
app.post("/customers/:id/notes", createNote);
app.patch("/notes/:noteId", updateNote);
app.delete("/notes/:noteId", deleteNote);

export default app;
