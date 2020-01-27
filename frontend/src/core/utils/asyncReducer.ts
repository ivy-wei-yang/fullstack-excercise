import { ActionType, createAsyncAction, getType } from "typesafe-actions";

const createMyAsyncActions = (name: string) =>
    createAsyncAction(`${name}_REQUEST`, `${name}_SUCCESS`, `${name}_FAILURE`)<
        any,
        { data: object | object[]; id?: string },
        any
    >();

export interface AsyncRequestState {
    data?: object | object[];
    loading: boolean;
    error?: object | string;
}

const initialState: AsyncRequestState = {
    data: null,
    loading: false,
    error: null
};

export const createAsyncReducer = (name: string) => {
    const asyncActions = createMyAsyncActions(name);
    type Action = ActionType<typeof asyncActions>;

    const reducer = (
        state: Readonly<AsyncRequestState> = initialState,
        action: Action
    ): AsyncRequestState => {
        switch (action.type) {
            case getType(asyncActions.request):
                return {
                    ...state,
                    loading: true
                };
            case getType(asyncActions.success):
                return {
                    ...state,
                    data: (action.payload || {}).data,
                    loading: false
                };
            case getType(asyncActions.failure):
                return {
                    ...state,
                    error: (action.payload || {}).error,
                    loading: false
                };
            default:
                return state;
        }
    };

    return {
        actions: asyncActions,
        reducer
    };
};
