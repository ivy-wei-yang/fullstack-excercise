import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl
} from "@material-ui/core";
import { Field, Form, FormikProps } from "formik";
import { TextField } from "formik-material-ui";

import { NOTE_EDIT_MODAL, NoteFormData } from "modules/notes/types";

interface NoteFormDialogProps {
    id: string;
    visible: boolean;
    actions: {
        close: (name: string) => void;
    };
}

export const NoteFormDialog = ({
    id,
    visible,
    actions,
    submitForm,
    errors,
    touched,
    isSubmitting
}: NoteFormDialogProps & FormikProps<NoteFormData>) => {
    const handleClose = () => {
        actions.close(NOTE_EDIT_MODAL);
    };

    return (
        <Form>
            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={visible}
                onClose={handleClose}
            >
                <DialogTitle>{id ? "Update" : "Create"} Note</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <Field
                            type="text"
                            name="text"
                            label="Text"
                            component={TextField}
                            multiline
                            rows={3}
                        />
                        {errors.text && touched.text && errors.text}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Form>
    );
};
