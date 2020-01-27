import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, mapTo, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { actions as notificationActions } from "core/ducks/notification";
import { actions as customerListActions } from "modules/customers/ducks/list";
import { actions as createNoteActions } from "../ducks/createNote";

import api from "core/apiClient";

const allActions = { customerListActions, createNoteActions };
type Action = ActionType<typeof allActions>;

const createNote = (payload: any) => {
    return api
        .post(`/customers/${payload.customerId}/notes`, payload.data)
        .then(response => ({ data: response.data, id: payload.customerId }));
};

export const createNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(createNoteActions.request)),
        switchMap(action =>
            from(createNote(action.payload || {})).pipe(
                map(createNoteActions.success),
                catchError(error => of(createNoteActions.failure({ error })))
            )
        )
    );

const showSuccessCreateNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(createNoteActions.success)),
        mapTo(notificationActions.success.show("Successfully created a note!"))
    );

const showErrorCreateNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(createNoteActions.failure)),
        mapTo(
            notificationActions.error.show(
                "Error happened during note creation, please contact admin."
            )
        )
    );

export default [
    createNoteEpic,
    showSuccessCreateNoteEpic,
    showErrorCreateNoteEpic
];
