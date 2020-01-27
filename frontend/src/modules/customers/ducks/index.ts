import { combineReducers } from "redux";

import get from "./get";
import list from "./list";
import update from "./update";

const reducers = combineReducers({
    update,
    list,
    get
});

export default reducers;
