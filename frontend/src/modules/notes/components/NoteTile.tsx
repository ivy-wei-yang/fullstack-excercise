import React, { Fragment } from "react";

import { Divider, Grid, IconButton, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import { Customer, Note } from "modules/customers/types";

export const NoteText = styled(Typography)({
    lineHeight: 3
});

interface NoteTileProps {
    customer: Customer;
    notes: Note[];
    onEditNote: (note: Note, customer: Customer) => void;
    onDeleteNote: (note: Note) => void;
}

export const NoteTile = ({
    customer,
    notes,
    onEditNote,
    onDeleteNote
}: NoteTileProps) => {
    return (
        <Grid container>
            {(notes || []).map((note, index) => (
                <Fragment key={index}>
                    <Grid item xs={8}>
                        <NoteText variant="body2">{note.note}</NoteText>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justify="flex-end">
                            <IconButton
                                color="primary"
                                aria-label="edit-note"
                                onClick={onEditNote.bind(null, note, customer)}
                            >
                                <EditOutlinedIcon
                                    color="primary"
                                    fontSize="small"
                                />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                aria-label="delete-note"
                                onClick={onDeleteNote.bind(null, note)}
                            >
                                <DeleteForeverOutlinedIcon
                                    color="secondary"
                                    fontSize="small"
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Fragment>
            ))}
            <Grid item xs={12}>
                <Grid container justify="flex-end">
                    <IconButton
                        color="primary"
                        aria-label="add-note"
                        onClick={onEditNote.bind(null, null, customer)}
                    >
                        <AddCircleOutlineIcon
                            color="primary"
                            fontSize="small"
                        />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};
