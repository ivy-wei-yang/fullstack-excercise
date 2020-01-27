import { Request, Response } from "express";
import * as customerService from "../service/customerService";

/**
 * Get all customers, accepts `filter` and `sort` in the query string, e.g:
 *      `/customers?filter=status=current&sort=phone=ASC`
 *      `/customers?filter=status=&sort=phone=DESC`
 * accept `status` in the filter, and `phone` in the sort
 * @param req
 * @param res
 * @param next
 * @returns status code 200 with an array of customers
 *          status code 400 if if status or sort order is not valid
 */
export const getAllCustomers = async (req: Request, res: Response, next: any) => {
    try {
        const { filter, sort } = req.query;
        const customers = await customerService.getAllCustomers(filter, sort);
        res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
};

/**
 * Get a customer by its id
 * @param req
 * @param res
 * @param next
 * @returns status code 200 if found it, and return the customer
 *          status code 404 if customer is not found
 *          route error to app server if happens
 */
export const getCustomerById = async (req: Request, res: Response, next: any) => {
    const { id } = req.params;
    try {
        const customer = await customerService.getCustomerById(id);
        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
};

/**
 * Update a customer's status
 * @param req
 * @param res
 * @param next
 * @returns status code 200 with the updated customer
 *          status code 304 if not modified
 *          status code 404 if customer is not found
 *          status code 400 if status is not valid
 *          route error to app server if happens
 */
export const updateCustomerStatus = async (req: Request, res: Response, next: any) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const customer = await customerService.updateCustomerStatus(id, status);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(304).send();
        }
    } catch (error) {
        next(error);
    }
};
