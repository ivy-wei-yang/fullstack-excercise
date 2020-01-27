import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, mapTo, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { actions as notificationActions } from "core/ducks/notification";
import { actions as customerListActions } from "modules/customers/ducks/list";
import { actions as updateNoteActions } from "../ducks/updateNote";

import api from "core/apiClient";

const allActions = { customerListActions, updateNoteActions };
type Action = ActionType<typeof allActions>;

const updateNote = (payload: any) => {
    return api
        .patch(`/notes/${payload.id}`, payload.data)
        .then(response => ({ data: response.data, id: payload.customerId }));
};

const updateNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(updateNoteActions.request)),
        switchMap(action =>
            from(updateNote(action.payload || {})).pipe(
                map(updateNoteActions.success),
                catchError(error => of(updateNoteActions.failure({ error })))
            )
        )
    );

const showSuccessUpdateNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(updateNoteActions.success)),
        mapTo(notificationActions.success.show("Successfully updated a note!"))
    );

const showErrorUpdateNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(updateNoteActions.failure)),
        mapTo(
            notificationActions.error.show(
                "Error happened during note update, please contact admin."
            )
        )
    );

export default [
    updateNoteEpic,
    showSuccessUpdateNoteEpic,
    showErrorUpdateNoteEpic
];
