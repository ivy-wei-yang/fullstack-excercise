import querystring from "querystring";
import { getRepository } from "../db/ConnectionFactory";
import { Customer } from "../entity/Customer";
import { CustomerNotFoundError, InvalidRequestError } from "../model/customErrors";
import logger from "../util/logger";
import { Status, Order } from "../util/types";
import { isValidStatus, isValidOrder } from "./validationHelper";

/**
 * Get all customers. The filter and sort are in simple formats:
 * *     `filter=status=current` `sort=phone=ASC`
 *      `filter=status=`   `sort=phone=DESC`
 * @returns an array of customers
 *          or throw InvalidRequestError if status/order is not valid
 */
export const getAllCustomers = async (filter: string, sort: string): Promise<Customer[]> => {
    const filterObject = querystring.parse(filter);
    if (!isValidStatus(filterObject.status as string)) {
        throw new InvalidRequestError("Invalid status, please check.");
    }

    const sortObject = querystring.parse(sort);
    if (!isValidOrder(sortObject.phone as string)) {
        throw new InvalidRequestError("Invalid order, please check.");
    }

    const status = filterObject.status as Status;
    const phone = sortObject.phone as Order;

    const query = !status ? {} : { status };
    const order = !phone ? {} : { phone };

    const customers = await getRepository(Customer).find({
        where: { ...query },
        order,
        relations: ["notes"]
    });
    logger.info("All customers are retrieved.");
    return customers;
};

/**
 * Get a customer by its id
 * @param id string: customer id
 * @returns created customer
 *          or throw CustomerNotFoundError if customer could not be found
 */
export const getCustomerById = async (id: string): Promise<Customer> => {
    const customerRepository = getRepository(Customer);
    try {
        const customer = await customerRepository.findOneOrFail(id, {
            relations: ["notes"]
        });
        logger.info(`Customer with id ${id} is retrieved.`);
        return customer;
    } catch (error) {
        logger.info(error.message);
        throw new CustomerNotFoundError(`Customer with id: ${id} not found`);
    }
};

/**
 * Update a customer's status
 * @param id string: customer id
 * @param status Status: new status
 * @returns return updated customer
 *          return null if not modidifed
 *          or throw CustomerNotFoundError if customer could not be found
 *          or throw InvalidRequestError if status is not valid
 */
export const updateCustomerStatus = async (id: string, status: string): Promise<Customer> => {
    if (!isValidStatus(status)) {
        throw new InvalidRequestError("Invalid status, please check.");
    }
    const customerRepository = getRepository(Customer);
    try {
        const customer = await customerRepository.findOneOrFail(id);
        if (status === customer.status) {
            return null;
        } else {
            logger.info(`To update Customer with id ${id} is updated with status: ${status}`);
            const updatedCustomer = customer.modifyStatus(status as Status);
            const savedCustomer = await customerRepository.save(updatedCustomer);
            logger.info(`Customer with id ${id} is updated with status: ${status}`);
            return savedCustomer;
        }
    } catch (error) {
        logger.info(error.message);
        throw new CustomerNotFoundError(`Customer with id: ${id} not found`);
    }
};
