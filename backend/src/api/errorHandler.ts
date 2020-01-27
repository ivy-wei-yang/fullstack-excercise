import { Request, Response } from "express";
import { CustomerNotFoundError, NoteNotFoundError, InvalidRequestError } from "../model/customErrors";
import logger from "../util/logger";

export function errorHandler(err: Error, req: Request, res: Response, next: any) {
    switch (err.constructor.name) {
        case CustomerNotFoundError.name:
        case NoteNotFoundError.name: {
            res.status(404);
            res.send(err.message);
            break;
        }
        case InvalidRequestError.name: {
            res.status(400);
            res.send(err.message);
            break;
        }
        default:
            logger.error(err.message);
            res.status(500);
            res.send("Unexpected error, please contact the admin.");
    }
    logger.error(err.message);
}
