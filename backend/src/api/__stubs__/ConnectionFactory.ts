import { ObjectType } from "typeorm";
import { Customer } from "../../entity/Customer";
import { Note } from "../../entity/Note";
import { Status } from "../../util/types";

export class ConnectionFactory {
    public static init = () => {
        console.log("Create a new connection");
    };
}

export const customer1 = new Customer({
    id: "1f6e3fa7-7761-4b55-a694-3e22b7e485fd",
    firstName: "Bob",
    lastName: "Thomas",
    status: Status.Current,
    phone: "79473983",
    address: "8 Custom Street, Auckland 1010",
    created: new Date("2019-10-01T11:41:56.363Z"),
    notes: []
});
export const customer2 = new Customer({
    id: "2dc44f7e-f31e-46bf-b3bf-ef1de429d2d6",
    firstName: "Mark",
    lastName: "Zed",
    status: Status.Current,
    phone: "7372390",
    address: "12 Queen Street, Auckland CBD, Auckland",
    created: new Date("2019-10-02T11:41:56.363Z"),
    notes: []
});

export const note1 = new Note({
    note: "Ivy test note",
    id: "fd45030a-b416-484a-9138-bfbbd6f7876f",
    created: new Date("2019-10-04T11:45:48.475Z"),
    customer: null
});
export const note2 = new Note({
    note: "Ivy test note",
    id: "953601d6-4cc7-46e9-bb1f-56aa3bde686d",
    created: new Date("2019-10-04T11:48:16.650Z"),
    customer: null
});

class CustomerRepository {
    public find = ({ where: { status }, order: { phone } }: { where: { status: string }; order: { phone: "ASC" | "DESC" } }) => {
        if (!status || status === Status.Current) {
            return phone && phone === "ASC" ? [customer2, customer1] : [customer1, customer2];
        } else {
            return [];
        }
    };
    public findOneOrFail = (id: string) => {
        if (id === "1f6e3fa7-7761-4b55-a694-3e22b7e485fd") {
            return customer1;
        }
        throw new Error("could not find customer error");
    };
    public save = () => customer1;
}
class NoteRepository {
    public find = ({ customer: { id } }: { customer: Partial<Customer> }) => {
        if (id === "1f6e3fa7-7761-4b55-a694-3e22b7e485fd") {
            return [note1, note2];
        }
        throw new Error("error");
    };
    public save = () => note1;
    public findOneOrFail = (id: string) => {
        if (id === "fd45030a-b416-484a-9138-bfbbd6f7876f") {
            return note1;
        }
        throw new Error("error");
    };
    public delete = (id: string) => {
        if (id !== "fd45030a-b416-484a-9138-bfbbd6f7876f") {
            throw new Error("error");
        }
    };
}
export function getRepository<Entity>(entityClass: ObjectType<Entity>): any {
    if (entityClass.name === Customer.name) {
        return new CustomerRepository();
    }
    if (entityClass.name === Note.name) {
        return new NoteRepository();
    }
    return {};
}
