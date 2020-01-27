import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, mapTo, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import { actions as notificationActions } from "core/ducks/notification";
import { actions as customerListActions } from "modules/customers/ducks/list";
import { actions as deleteNoteActions } from "../ducks/deleteNote";

import api from "core/apiClient";

const allActions = { customerListActions, deleteNoteActions };
type Action = ActionType<typeof allActions>;

const deleteNote = (payload: any) => {
    return api
        .delete(`/notes/${payload.id}`)
        .then(response => ({ data: response.data, id: payload.customerId }));
};

const deleteNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(deleteNoteActions.request)),
        switchMap(action =>
            from(deleteNote(action.payload || {})).pipe(
                map(deleteNoteActions.success),
                catchError(error => of(deleteNoteActions.failure({ error })))
            )
        )
    );

const showSuccessDeleteNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(deleteNoteActions.success)),
        mapTo(notificationActions.success.show("Successfully deleted a note!"))
    );

const showErrorDeleteNoteEpic: Epic<Action, Action, any> = action$ =>
    action$.pipe(
        filter(isActionOf(deleteNoteActions.failure)),
        mapTo(
            notificationActions.error.show(
                "Error happened during note deletion, please contact admin."
            )
        )
    );

export default [
    deleteNoteEpic,
    showSuccessDeleteNoteEpic,
    showErrorDeleteNoteEpic
];
