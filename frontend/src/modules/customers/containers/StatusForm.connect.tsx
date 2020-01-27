import toLower from "lodash/toLower";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { Formik, FormikProps } from "formik";
import { StatusFormDialog } from "../components/StatusFormDialog";

// actions
import { actions as modalActions } from "core/ducks/modal";
import { actions as customerActions } from "../ducks/update";

// selectors
import { getModal } from "core/selectors";

import { CUSTOMER_STATUS_MODAL, StatusFormData } from "modules/customers/types";

interface FormDialogProps {
    id: string;
    initialValues: StatusFormData;
    visible: boolean;
    actions: {
        close: (name: string) => void;
        updateCustomer: (payload: object) => void;
    };
}

export const StatusForm = ({
    id,
    initialValues,
    visible,
    actions
}: FormDialogProps) => {
    const handleClose = () => {
        actions.close(CUSTOMER_STATUS_MODAL);
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                actions.updateCustomer({
                    id,
                    data: { status: toLower(values.status) }
                });
                handleClose();
            }}
            render={(props: FormikProps<StatusFormData>) => (
                <StatusFormDialog
                    {...props}
                    visible={visible}
                    actions={actions}
                />
            )}
        />
    );
};

const mapStateToProps = () => (state: any) => ({
    visible: getModal(state, CUSTOMER_STATUS_MODAL)
});

const allActions = { modalActions, customerActions };
type Action = ActionType<typeof allActions>;
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    actions: bindActionCreators(
        {
            close: modalActions.close,
            updateCustomer: customerActions.request
        },
        dispatch as any
    )
});

export const ConnectedStatusForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(StatusForm);
