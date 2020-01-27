import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, mapTo, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { actions as createNoteActions } from "modules/notes/ducks/createNote";
import { actions as deleteNoteActions } from "modules/notes/ducks/deleteNote";
import { actions as updateNoteActions } from "modules/notes/ducks/updateNote";
import { actions as customerGetActions } from "../ducks/get";
import { actions as customerUpdateActions } from "../ducks/update";

import api from "core/apiClient";

const allActions = { customerGetActions };
type Action = ActionType<typeof allActions>;

const getCustomer = (payload: any) => {
    return api
        .get(`/customers/${payload.id}`)
        .then(response => ({ data: response.data, id: payload.id }));
};

const customerGetEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(customerGetActions.request)),
        switchMap(action =>
            from(getCustomer(action.payload || {})).pipe(
                map(customerGetActions.success),
                catchError(error => of(customerGetActions.failure({ error })))
            )
        )
    );

const customerRefreshEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(
            isActionOf([
                customerUpdateActions.success,
                createNoteActions.success,
                updateNoteActions.success,
                deleteNoteActions.success
            ])
        ),
        map(action => customerGetActions.request({ id: action.payload.id }))
    );

export default [customerGetEpic, customerRefreshEpic];
