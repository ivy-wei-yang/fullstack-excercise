import { render } from "@testing-library/react";
import React from "react";
import { CustomerList } from "../List";

describe("CustomerList", () => {
    const getCustomersMock = jest.fn();
    const pushMock = jest.fn();
    const props = {
        customers: {
            data: [],
            loading: false
        },
        actions: {
            getCustomers: getCustomersMock
        },
        location: {
            search: "?status=Current&order=asc",
            pathname: "http://localhost:3000"
        },
        history: {
            push: pushMock
        }
    };

    it("Retrieve customers", () => {
        render(<CustomerList {...props} />);
        expect(getCustomersMock).toBeCalledWith({
            filter: "status=current",
            sort: "phone=ASC"
        });
    });

    it("Render status from url", () => {
        const { getByTestId } = render(<CustomerList {...props} />);
        const statusSelect = getByTestId("customers-list-select-status");

        expect(statusSelect.textContent).toEqual("Current");
    });
    it("Render sort from url", () => {
        const { getByText } = render(<CustomerList {...props} />);
        const phoneHeader = getByText("Phone");

        expect(
            phoneHeader
                .querySelector("svg")
                .classList.contains("MuiTableSortLabel-iconDirectionAsc")
        ).toBeTruthy();
    });
});
