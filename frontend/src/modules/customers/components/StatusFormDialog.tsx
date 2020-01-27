import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem
} from "@material-ui/core";
import { Field, Form, FormikProps } from "formik";
import { Select } from "formik-material-ui";

import {
    CUSTOMER_STATUS_MODAL,
    StatusFormData,
    statusOptions
} from "modules/customers/types";

interface StatusFormDialogProps {
    visible: boolean;
    actions: {
        close: (name: string) => void;
    };
}

export const StatusFormDialog = ({
    visible,
    actions,
    submitForm,
    errors,
    touched,
    isSubmitting
}: StatusFormDialogProps & FormikProps<StatusFormData>) => {
    const handleClose = () => {
        actions.close(CUSTOMER_STATUS_MODAL);
    };

    return (
        <Form>
            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={visible}
                onClose={handleClose}
            >
                <DialogTitle>Modify Status</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel shrink={true} htmlFor="status">
                            Status
                        </InputLabel>
                        <Field
                            type="text"
                            name="status"
                            component={Select}
                            inputProps={{
                                name: "status",
                                id: "customer-status",
                                margin: "dense"
                            }}
                        >
                            {statusOptions.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                        {errors.status && touched.status && errors.status}
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
