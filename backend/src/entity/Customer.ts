import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NonFunctionProperties, Status } from "../util/types";
import { Note } from "./Note";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    readonly id?: string;

    @Column("varchar", { length: 256 })
    readonly firstName: string;

    @Column("varchar", { length: 256 })
    readonly lastName: string;

    @Column("varchar", { length: 256 })
    readonly status: Status;

    @Column("varchar", { length: 256 })
    readonly phone: string;

    @Column("varchar", { length: 512 })
    readonly address: string;

    @OneToMany(
        (type) => Note,
        (note) => note.customer
    )
    readonly notes: Note[];

    @CreateDateColumn()
    readonly created?: Date;

    constructor(customer: NonFunctionProperties<Customer>) {
        Object.assign(this, customer);
    }

    public modifyStatus = (status: Status): Customer => {
        return { ...this, status };
    };
}
