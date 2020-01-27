import { combineReducers } from "redux";
import { createNotificationReducer } from "../utils/notificationReducer";

const {
    actions: errorActions,
    reducer: errorReducers
} = createNotificationReducer("ERROR");

const {
    actions: successActions,
    reducer: successReducers
} = createNotificationReducer("SUCCESS");

const {
    actions: warningActions,
    reducer: warningReducers
} = createNotificationReducer("WARNING");

const {
    actions: infoActions,
    reducer: infoReducers
} = createNotificationReducer("INFO");

export const actions = {
    error: errorActions,
    success: successActions,
    warning: warningActions,
    info: infoActions
};

const reducer = combineReducers({
    error: errorReducers,
    success: successReducers,
    warning: warningReducers,
    info: infoReducers
});
export default reducer;
