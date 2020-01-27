import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { actions as notificationActions } from "../ducks/notification";

import { getError, getInfo, getSuccess, getWarning } from "../selectors";

import { Notification } from "../components/Notification";

type Action = ActionType<typeof notificationActions>;

const mapStateToProps = () => (state: any) => ({
    success: getSuccess(state),
    error: getError(state),
    warning: getWarning(state),
    info: getInfo(state)
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    actions: {
        success: bindActionCreators(
            notificationActions.success,
            dispatch as any
        ),
        error: bindActionCreators(notificationActions.error, dispatch as any),
        warning: bindActionCreators(
            notificationActions.warning,
            dispatch as any
        ),
        info: bindActionCreators(notificationActions.info, dispatch as any)
    }
});

export const ConnectedNotification = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);
