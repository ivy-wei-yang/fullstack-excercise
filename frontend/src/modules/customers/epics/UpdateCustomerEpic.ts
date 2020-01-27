import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, mapTo, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { actions as notificationActions } from "core/ducks/notification";
import { actions as customerUpdateActions } from "../ducks/update";

import api from "core/apiClient";

const allActions = { customerUpdateActions };
type Action = ActionType<typeof allActions>;

const updateCustomer = (payload: any) => {
    return api
        .patch(`/customers/${payload.id}`, payload.data)
        .then(response => ({ data: response.data, id: payload.id }));
};

const customerUpdateEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(customerUpdateActions.request)),
        switchMap(action =>
            from(updateCustomer(action.payload || {})).pipe(
                map(customerUpdateActions.success),
                catchError(error =>
                    of(customerUpdateActions.failure({ error }))
                )
            )
        )
    );

const showSuccessUpdateStatusEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(customerUpdateActions.success)),
        mapTo(
            notificationActions.success.show(
                "Successfully updated customer status!"
            )
        )
    );
const showErrorUpdateStatusEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(customerUpdateActions.failure)),
        mapTo(
            notificationActions.error.show(
                "Error happened during customer update, please contact admin."
            )
        )
    );

export default [
    customerUpdateEpic,
    showSuccessUpdateStatusEpic,
    showErrorUpdateStatusEpic
];
