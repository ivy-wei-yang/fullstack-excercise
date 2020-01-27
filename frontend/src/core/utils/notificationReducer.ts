import { ActionType, createAction, getType } from "typesafe-actions";

const createNotificationActions = (type: string) => ({
    show: createAction(`${type}_SHOW`, action => {
        return (message: string) => action(message);
    }),
    hide: createAction(`${type}_HIDE`)
});

export interface NotificationState {
    show: boolean;
    message: string;
}

const initialState: NotificationState = {
    show: false,
    message: null
};

export const createNotificationReducer = (type: string) => {
    const notificationActions = createNotificationActions(type);
    type Action = ActionType<typeof notificationActions>;
    type ShowAction = ActionType<typeof notificationActions.show>;

    const reducer = (
        state: Readonly<NotificationState> = initialState,
        action: Action
    ): NotificationState => {
        switch (action.type) {
            case getType(notificationActions.show):
                return {
                    ...state,
                    show: true,
                    message: (action as ShowAction).payload
                };
            case getType(notificationActions.hide):
                return {
                    ...state,
                    show: false,
                    message: null
                };

            default:
                return state;
        }
    };

    return {
        actions: notificationActions,
        reducer
    };
};
