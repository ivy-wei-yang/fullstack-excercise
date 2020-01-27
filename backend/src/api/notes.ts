import { Request, Response } from "express";
import * as noteService from "../service/noteService";

/**
 * Get all notes given the customer id
 * @param req
 * @param res
 * @returns status code 200 with an array of notes
 */
export const getAllNotesByCustomerId = async (req: Request, res: Response, next: any) => {
    const id: string = req.params.id;
    try {
        const notes = await noteService.getAllNotesByCustomerId(id);
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

/**
 * Create a note for a customer given the customer id
 * @param req
 * @param res
 * @param next
 * @returns status code 201 with the created note
 *          route error to app server
 */
export const createNote = async (req: Request, res: Response, next: any) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const note = await noteService.createNote(id, text);
        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
};

/**
 * Update a note's text
 * @param req
 * @param res
 * @param next
 * @returns status code 200 with updated note
 *          route error to app server
 */
export const updateNote = async (req: Request, res: Response, next: any) => {
    const { noteId } = req.params;
    const { text } = req.body;
    try {
        const note = await noteService.updateNote(noteId, text);
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a note
 * @param req
 * @param res
 * @param next
 * @returns status code 200 if deleted successfully
 *          or route error to app server
 */
export const deleteNote = async (req: Request, res: Response, next: any) => {
    const { noteId } = req.params;

    try {
        await noteService.deleteNote(noteId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
