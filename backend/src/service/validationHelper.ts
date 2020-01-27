import { Status, Order } from "../util/types";

export function isValidStatus(status: string): boolean {
    if (!status) {
        return true;
    }

    if (Object.values(Status).some((value) => value === status)) {
        return true;
    }

    return false;
}

export function isValidOrder(order: string): boolean {
    if (!order) {
        return true;
    }

    if (Object.values(Order).some((value) => value === order)) {
        return true;
    }

    return false;
}
