import toLower from "lodash/toLower";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { Formik, FormikProps } from "formik";
import { NoteFormDialog } from "../components/NoteFormDialog";

// actions
import { actions as modalActions } from "core/ducks/modal";
import { actions as createNoteActions } from "../ducks/createNote";
import { actions as updateNoteActions } from "../ducks/updateNote";

// selectors
import { getModal } from "core/selectors";

import { NOTE_EDIT_MODAL, NoteFormData } from "modules/notes/types";

interface FormDialogProps {
    customerId: string;
    id: string;
    initialValues: NoteFormData;
    visible: boolean;
    actions: {
        close: (name: string) => void;
        createNote: (payload: object) => void;
        updateNote: (payload: object) => void;
    };
}

export const NoteForm = ({
    customerId,
    id,
    initialValues,
    visible,
    actions
}: FormDialogProps) => {
    const handleClose = () => {
        actions.close(NOTE_EDIT_MODAL);
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
                if (id) {
                    actions.updateNote({
                        customerId,
                        id,
                        data: { text: values.text }
                    });
                } else {
                    actions.createNote({
                        customerId,
                        data: { text: values.text }
                    });
                }
                setSubmitting(false);
                handleClose();
            }}
            render={(props: FormikProps<NoteFormData>) => (
                <NoteFormDialog
                    {...props}
                    id={id}
                    visible={visible}
                    actions={actions}
                />
            )}
        />
    );
};

const mapStateToProps = () => (state: any) => ({
    visible: getModal(state, NOTE_EDIT_MODAL)
});

const allActions = { modalActions, createNoteActions, updateNoteActions };
type Action = ActionType<typeof allActions>;
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    actions: bindActionCreators(
        {
            close: modalActions.close,
            createNote: createNoteActions.request,
            updateNote: updateNoteActions.request
        },
        dispatch as any
    )
});

export const ConnectedNoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteForm);
