import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { actions as customerListActions } from "../ducks/list";
import { actions as customerUpdateActions } from "../ducks/update";

import api from "core/apiClient";

const allActions = { customerUpdateActions, customerListActions };
type Action = ActionType<typeof allActions>;

const getCustomers = (payload: any) => {
    return api
        .get("/customers", { params: payload })
        .then(response => ({ data: response.data }));
};

const customerListEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(customerListActions.request)),
        switchMap(action =>
            from(getCustomers(action.payload || {})).pipe(
                map(customerListActions.success),
                catchError(error => of(customerListActions.failure({ error })))
            )
        )
    );

export default [customerListEpic];
