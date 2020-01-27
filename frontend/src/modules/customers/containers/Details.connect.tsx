import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { CustomerDetails } from "../components/Details";

import { actions as modalActions } from "core/ducks/modal";
import { actions as customersGetActions } from "../ducks/get";

import { getCustomer } from "../selectors";

type Action = ActionType<typeof modalActions>;

const mapStateToProps = () => (state: any) => ({
    customer: getCustomer(state).data || {},
    loading: getCustomer(state).loading
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    actions: bindActionCreators(
        {
            getCustomer: customersGetActions.request,
            openModal: modalActions.open
        },
        dispatch as any
    )
});

export const ConnectedCustomerDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerDetails);
