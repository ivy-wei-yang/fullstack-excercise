import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { actions as customersListActions } from "../ducks/list";

import { getCustomers } from "../selectors";

import { CustomerList } from "../components/List";

type Action = ActionType<typeof customersListActions>;

const mapStateToProps = () => (state: any) => ({
    customers: getCustomers(state)
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    actions: bindActionCreators(
        {
            getCustomers: customersListActions.request
        },
        dispatch as any
    )
});

export const ConnectedCustomerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerList);
