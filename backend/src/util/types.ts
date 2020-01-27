// NonFunctionPropertyNames is from https://www.typescriptlang.org/docs/handbook/advanced-types.html
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export enum Status {
    Prospective = "prospective",
    Current = "current",
    NonActive = "non-active"
}

export enum Order {
    Asc = "ASC",
    Desc = "DESC"
}
