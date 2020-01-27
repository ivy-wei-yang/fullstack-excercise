import React, { useEffect, useState } from "react";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps
} from "react-router-dom";

import {
    Fab,
    Grid,
    IconButton,
    Link,
    Paper,
    Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
    ArrowBack as ArrowBackIcon,
    EditOutlined as EditOutlinedIcon
} from "@material-ui/icons";

import { Loader } from "core/components/Loader";
import { NoteTile } from "modules/notes/components/NoteTile";
import { ConnectedDelete } from "modules/notes/containers/Delete.connect";
import { ConnectedNoteForm } from "modules/notes/containers/NoteForm.connect";
import { ConnectedStatusForm } from "../containers/StatusForm.connect";

import {
    CUSTOMER_STATUS_MODAL,
    Customer,
    Note
} from "modules/customers/types";
import { NOTE_DELETE_MODAL, NOTE_EDIT_MODAL } from "modules/notes/types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        page: {
            width: 800,
            margin: "auto"
        },
        root: {
            padding: theme.spacing(3, 2)
        },
        head: {
            margin: theme.spacing(5, 0)
        },
        section: {
            margin: theme.spacing(5, 0, 2, 0)
        },
        title: {
            margin: theme.spacing(3, 0)
        },
        edit: {
            padding: theme.spacing(2.5)
        }
    })
);

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const Link1 = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
    (props, ref) => <RouterLink innerRef={ref} {...props} />
);

interface LabelTextProps {
    label: string;
    text: string;
}
const LabelText = ({ label, text }: LabelTextProps) => (
    <div>
        <Typography variant="overline" color="textSecondary">
            {label}
        </Typography>
        <Typography variant="body1">{text}</Typography>
    </div>
);

interface CustomerDetailsProps {
    match: {
        params: {
            id: string;
        };
    };
    customer: Customer;
    loading: boolean;
    actions: {
        getCustomer: (payload: { id: string }) => any;
        openModal: (modalName: string) => void;
    };
}

export const CustomerDetails = ({
    match,
    loading,
    customer,
    actions
}: CustomerDetailsProps) => {
    const id = match.params.id;
    useEffect(() => {
        actions.getCustomer({ id });
    }, [id]);
    const classes = useStyles({});

    const [note, setNote] = useState(null);

    const onEditStatus = () => {
        actions.openModal(CUSTOMER_STATUS_MODAL);
    };
    const onEditNote = (noteToEdit: Note) => {
        setNote(noteToEdit);
        actions.openModal(NOTE_EDIT_MODAL);
    };
    const onDeleteNote = (noteToDelete: Note) => {
        setNote(noteToDelete);
        actions.openModal(NOTE_DELETE_MODAL);
    };
    return (
        <div className={classes.page}>
            <Paper className={classes.root}>
                <Link component={Link1} to="/" color="secondary">
                    <Fab variant="extended">
                        <ArrowBackIcon color="secondary" /> Customer List
                    </Fab>
                </Link>
                <Loader loading={loading}>
                    <Typography
                        variant="h5"
                        component="h3"
                        className={classes.head}
                    >
                        {customer.name}
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <LabelText
                                label="First Name"
                                text={customer.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LabelText
                                label="Last Name"
                                text={customer.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container>
                                <LabelText
                                    label="Status"
                                    text={customer.status}
                                />
                                <IconButton
                                    color="primary"
                                    aria-label="edit-customer-status"
                                    onClick={onEditStatus.bind(null, customer)}
                                    className={classes.edit}
                                >
                                    <EditOutlinedIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LabelText label="Phone" text={customer.phone} />
                        </Grid>
                        <Grid item xs={12}>
                            <LabelText
                                label="Address"
                                text={customer.address}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LabelText
                                label="Created"
                                text={customer.created}
                            />
                        </Grid>
                    </Grid>

                    <Grid container className={classes.section}>
                        <Typography variant="h6" className={classes.title}>
                            Notes
                        </Typography>
                        <NoteTile
                            customer={customer}
                            notes={customer.notes}
                            onEditNote={onEditNote}
                            onDeleteNote={onDeleteNote}
                        />
                    </Grid>
                    <ConnectedStatusForm
                        id={(customer || {}).id}
                        initialValues={{
                            status: (customer || {}).status
                        }}
                    />
                    <ConnectedNoteForm
                        customerId={(customer || {}).id}
                        id={(note || {}).id}
                        initialValues={{
                            text: (note || {}).note
                        }}
                    />
                    <ConnectedDelete
                        customerId={(customer || {}).id}
                        id={(note || {}).id}
                    />
                </Loader>
            </Paper>
        </div>
    );
};
