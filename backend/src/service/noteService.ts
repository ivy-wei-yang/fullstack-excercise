import { getRepository } from "../db/ConnectionFactory";
import { Customer } from "../entity/Customer";
import { Note } from "../entity/Note";
import { CustomerNotFoundError, NoteNotFoundError } from "../model/customErrors";
import logger from "../util/logger";

/**
 * Get all notes given the customer id
 * @param customerId string: customer id
 * @returns an array of notes
 */
export const getAllNotesByCustomerId = async (customerId: string): Promise<Note[]> => {
    try {
        const notes = await getRepository(Note).find({ customer: { id: customerId } });
        logger.info(`Notes of customer with id ${customerId} are retrieved.`);
        return notes;
    } catch (error) {
        logger.info(error.message);
        throw new CustomerNotFoundError(`Customer with id: ${customerId} not found`);
    }
};

/**
 * Create a note for a customer given the customer id
 * @param customerId string: customer id
 * @param text string: note text
 * @returns created note
 *          throw CustomerNotFoundError if customer could not be found
 */
export const createNote = async (customerId: string, text: string): Promise<Note> => {
    const noteRepository = getRepository(Note);
    try {
        const customer = await getRepository(Customer).findOneOrFail(customerId);
        const note = new Note({ customer, note: text || "" });
        const savedNote = await noteRepository.save(note);
        logger.info(`Note is created for customer with id ${customerId}.`);
        return savedNote;
    } catch (error) {
        logger.info(error.message);
        throw new CustomerNotFoundError(`Customer with id: ${customerId} not found`);
    }
};

/**
 * Update a note's text
 * @param id string: note id
 * @param text string: note text
 * @returns updated note
 *          or throw NoteNotFoundError if note could not be found
 */
export const updateNote = async (id: string, text: string): Promise<Note> => {
    const noteRepository = getRepository(Note);
    try {
        const note = await noteRepository.findOneOrFail(id);
        const updatedNote = note.modifyText(text);
        const savedNote = await noteRepository.save(updatedNote);
        logger.info(`Note is updated to text: ${text}.`);
        return savedNote;
    } catch (error) {
        logger.info(error.message);
        throw new NoteNotFoundError(`Note with id: ${id} not found`);
    }
};

/**
 * Delete a note
 * @param id string: note id
 * @returns void if delete successfully
 *          or throw NoteNotFoundError
 */
export const deleteNote = async (id: string): Promise<void> => {
    const noteRepository = getRepository(Note);
    try {
        await noteRepository.delete(id);
        logger.info(`Note with id ${id} is deleted.`);
    } catch (error) {
        logger.info(error.message);
        throw new NoteNotFoundError(`Note with id: ${id} not found`);
    }
};
