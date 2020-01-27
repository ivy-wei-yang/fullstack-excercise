import { ActionType, createAction, getType } from "typesafe-actions";

export const actions = {
    open: createAction(`MODAL_OPEN`, action => {
        return (modalName: string) => action(modalName);
    }),
    close: createAction(`MODAL_CLOSE`, action => {
        return (modalName: string) => action(modalName);
    })
};

export interface OpenCloseState {
    [key: string]: boolean;
}

const initialState: OpenCloseState = {};

type Action = ActionType<typeof actions>;

const reducer = (
    state: Readonly<OpenCloseState> = initialState,
    action: Action
): OpenCloseState => {
    switch (action.type) {
        case getType(actions.open):
            return {
                ...state,
                [action.payload]: true
            };
        case getType(actions.close):
            const { [action.payload]: modalName, ...restState } = state;
            return restState;

        default:
            return state;
    }
};

export default reducer;
