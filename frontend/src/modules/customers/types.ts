export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    status: string;
    phone: string;
    address: string;
    created: string;
    notes: Note[];
    name?: string;
}

export interface Note {
    id: string;
    note: string;
    created: string;
}

export const CUSTOMER_STATUS_MODAL = "CUSTOMER_STATUS_MODAL";

export interface StatusFormData {
    status: string;
}

export const statusOptions = [
    {
        value: "Current",
        label: "Current"
    },
    {
        value: "Prospective",
        label: "Prospective"
    },
    {
        value: "Non-active",
        label: "Non-active"
    }
];
