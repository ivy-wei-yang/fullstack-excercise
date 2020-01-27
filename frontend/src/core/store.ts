import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
    Store
} from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

/**
 * Redux store setup
 */
import customerReducers from "modules/customers/ducks";
import noteReducers from "modules/notes/ducks/createNote";
import modalReducers from "./ducks/modal";
import notificationReducers from "./ducks/notification";

import customerEpics from "modules/customers/epics";
import noteEpics from "modules/notes/epics";

const reducers = combineReducers({
    modal: modalReducers,
    notification: notificationReducers,
    customers: customerReducers,
    note: noteReducers
});

const epics = combineEpics(...customerEpics, ...noteEpics);

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (a: any) => any;
    }
}

const composeEnhancers =
    (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epicMiddleware = createEpicMiddleware();

export function configureStore(initialState = {}): Store<object> {
    // configure middlewares
    const middlewares = [epicMiddleware];
    // compose enhancers
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    // create store
    const store = createStore(reducers, initialState, enhancer);
    epicMiddleware.run(epics);

    return store;
}
