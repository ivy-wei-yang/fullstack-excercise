import { History } from "history";
import querystring from "querystring";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from "@material-ui/core";
import {
    createStyles,
    makeStyles,
    Theme,
    withStyles
} from "@material-ui/core/styles";
import { Loader } from "core/components/Loader";

import { Customer, statusOptions } from "modules/customers/types";

const options = [
    {
        label: "All",
        value: ""
    },
    ...statusOptions
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(3, 3, 3, 3),
            overflowX: "auto"
        },
        title: {
            padding: theme.spacing(2, 2, 2, 2)
        },
        select: {
            width: 150
        }
    })
);

const StyledTableCell = withStyles(() =>
    createStyles({
        head: {
            fontSize: 16,
            fontWeight: 600
        },
        body: {
            fontSize: 16
        }
    })
)(TableCell);

interface CustomerListProps {
    customers: {
        loading: boolean;
        data: any[];
    };
    actions: {
        getCustomers: (query: object) => void;
    };
    location: {
        search: string;
        pathname: string;
    };
    history: History;
}

type Order = "asc" | "desc";

export const CustomerList = ({
    customers,
    actions,
    location,
    history
}: CustomerListProps) => {
    const queries = querystring.parse(location.search.replace(/^\?/, ""));
    const status = (queries.status as string) || "";
    const order = (queries.order as Order) || "asc";
    useEffect(() => {
        actions.getCustomers({
            filter: `status=${status.toLowerCase()}`,
            sort: `phone=${order.toUpperCase()}`
        });
    }, [status, order]);
    const classes = useStyles({});

    const handleStatusChange = (
        event: React.ChangeEvent<{ name?: string; value: string }>
    ) => {
        const query = querystring.stringify({
            status: event.target.value,
            order
        });
        // push to url to reload data
        history.push(`${location.pathname}?${query}`);
    };

    const handlePhoneSort = () => {
        const isDesc = order === "desc";
        const query = querystring.stringify({
            status,
            order: isDesc ? "asc" : "desc"
        });
        // push to url to reload data
        history.push(`${location.pathname}?${query}`);
    };

    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6" className={classes.title}>
                        Customers
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify="flex-end">
                        <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select
                                data-testid="customers-list-select-status"
                                value={status || ""}
                                onChange={handleStatusChange}
                                className={classes.select}
                            >
                                {options.map(option => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Loader loading={customers.loading}>
                <Table aria-label="customers">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>
                                <TableSortLabel
                                    active
                                    direction={order}
                                    onClick={handlePhoneSort}
                                >
                                    Phone
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Created</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(customers.data || []).map((row: Customer) => (
                            <TableRow key={row.firstName}>
                                <StyledTableCell component="th" scope="row">
                                    <Link to={`/customers/${row.id}`}>
                                        {row.name}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell>{row.status}</StyledTableCell>
                                <StyledTableCell>{row.phone}</StyledTableCell>
                                <StyledTableCell>{row.address}</StyledTableCell>
                                <StyledTableCell>{row.created}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Loader>
        </Paper>
    );
};
