import { format } from "date-fns";
import capitalize from "lodash/capitalize";
import { createSelector } from "reselect";

// default locale is en-US
const formatDate = (date: string) => format(new Date(date), "PPp");

const convertCustomer = item => ({
    ...item,
    name: `${item.firstName} ${item.lastName}`,
    status: capitalize(item.status),
    created: formatDate(item.created)
});

export const getCustomersRaw = (state: any) => state.customers.list;
export const getCustomers = createSelector(
    getCustomersRaw,
    result => {
        const { data: list } = result;

        const data = (list || []).map(item => convertCustomer(item));

        return { ...result, data };
    }
);

export const getCustomerRaw = (state: any) => state.customers.get;
export const getCustomer = createSelector(
    getCustomerRaw,
    result => {
        const { data: item } = result;
        if (!item) {
            return result;
        }

        const data = convertCustomer(item);

        return { ...result, data };
    }
);
