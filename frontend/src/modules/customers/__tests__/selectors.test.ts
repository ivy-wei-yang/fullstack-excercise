import { getCustomer, getCustomers } from "../selectors";

it("selectors: getCustomers", () => {
    const state = {
        customers: {
            list: {
                data: [
                    {
                        id: "1f6e3fa7-7761-4b55-a694-3e22b7e485fd",
                        firstName: "Bob",
                        lastName: "Thomas",
                        status: "current",
                        phone: "79473983",
                        address: "8 Custom Street, Auckland 1010",
                        created: new Date("2019-10-01T11:41:56.363Z")
                    }
                ],
                loading: false
            }
        }
    };

    const actual = getCustomers(state);
    expect(actual).toEqual({
        data: [
            {
                id: "1f6e3fa7-7761-4b55-a694-3e22b7e485fd",
                name: "Bob Thomas",
                firstName: "Bob",
                lastName: "Thomas",
                status: "Current",
                phone: "79473983",
                address: "8 Custom Street, Auckland 1010",
                created: "Oct 2, 2019, 12:41 AM"
            }
        ],
        loading: false
    });
});

it("selectors: getCustomer", () => {
    const state = {
        customers: {
            get: {
                data: {
                    id: "1f6e3fa7-7761-4b55-a694-3e22b7e485fd",
                    firstName: "Bob",
                    lastName: "Thomas",
                    status: "current",
                    phone: "79473983",
                    address: "8 Custom Street, Auckland 1010",
                    created: new Date("2019-10-01T11:41:56.363Z")
                },
                loading: false
            }
        }
    };

    const actual = getCustomer(state);
    expect(actual).toEqual({
        data: {
            id: "1f6e3fa7-7761-4b55-a694-3e22b7e485fd",
            name: "Bob Thomas",
            firstName: "Bob",
            lastName: "Thomas",
            status: "Current",
            phone: "79473983",
            address: "8 Custom Street, Auckland 1010",
            created: "Oct 2, 2019, 12:41 AM"
        },
        loading: false
    });
});
