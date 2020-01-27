import React from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";

import { ConnectedNotification } from "../containers/Notification.connect";
import { Routes } from "./Routes";

import { configureStore } from "../store";

const store = configureStore();

export const App = () => (
    <Provider store={store}>
        <IntlProvider locale="en-NZ">
            <Routes />
            <ConnectedNotification />
        </IntlProvider>
    </Provider>
);
