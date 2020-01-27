import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { NonFunctionProperties } from "../util/types";
import { Customer } from "./Customer";

@Entity()
export class Note {
    @PrimaryGeneratedColumn("uuid")
    readonly id?: string;

    @Column("text")
    readonly note: string;

    @ManyToOne(
        (type) => Customer,
        (customer) => customer.notes
    )
    readonly customer: Customer;

    @CreateDateColumn()
    readonly created?: Date;

    constructor(note: NonFunctionProperties<Note>) {
        Object.assign(this, note);
    }

    public modifyText = (text: string): Note => {
        return { ...this, note: text };
    };
}
