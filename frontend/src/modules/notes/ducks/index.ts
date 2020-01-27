import { combineReducers } from "redux";

import createReducer from "./createNote";
import deleteReducer from "./deleteNote";
import updateReducer from "./updateNote";

const reducer = combineReducers({
    create: createReducer,
    update: updateReducer,
    delete: deleteReducer
});

export default reducer;
