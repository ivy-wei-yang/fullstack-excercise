import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";

import { NOTE_DELETE_MODAL } from "modules/notes/types";

interface DeleteDialogProps {
    customerId: string;
    id: string;
    visible: boolean;
    actions: {
        close: (name: string) => void;
        deleteNote: (payload: object) => void;
    };
}

export const DeleteDialog = ({
    customerId,
    id,
    visible,
    actions
}: DeleteDialogProps) => {
    const handleClose = () => {
        actions.close(NOTE_DELETE_MODAL);
    };

    const onDelete = () => {
        actions.deleteNote({ customerId, id });
        handleClose();
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="xs"
            open={visible}
            onClose={handleClose}
        >
            <DialogTitle>Delete Note</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure to delete this note?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button type="submit" color="primary" onClick={onDelete}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
