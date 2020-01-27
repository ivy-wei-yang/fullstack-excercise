import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { DeleteDialog } from "../components/DeleteDialog";

// actions
import { actions as modalActions } from "core/ducks/modal";
import { actions as deleteNoteActions } from "../ducks/deleteNote";

// selectors
import { getModal } from "core/selectors";

import { NOTE_DELETE_MODAL } from "modules/notes/types";

interface FormDialogProps {
    customerId: string;
    id: string;
    visible: boolean;
    actions: {
        close: (name: string) => void;
        deleteNote: (payload: object) => void;
    };
}

export const Delete = ({
    customerId,
    id,
    visible,
    actions
}: FormDialogProps) => (
        <DeleteDialog
            customerId={customerId}
            id={id}
            visible={visible}
            actions={actions}
        />
    );

const mapStateToProps = () => (state: any) => ({
    visible: getModal(state, NOTE_DELETE_MODAL)
});

const allActions = { modalActions, deleteNoteActions };
type Action = ActionType<typeof allActions>;
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    actions: bindActionCreators(
        {
            close: modalActions.close,
            deleteNote: deleteNoteActions.request
        },
        dispatch as any
    )
});

export const ConnectedDelete = connect(
    mapStateToProps,
    mapDispatchToProps
)(Delete);
