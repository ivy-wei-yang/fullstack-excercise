import React from "react";
import { Redirect, Route, Switch, Router } from "react-router-dom";

import { ConnectedCustomerDetails, ConnectedCustomerList } from "modules/customers/containers";
import { myHistory } from "../history";

export const Routes = () => (
    <Router history={myHistory}>
        <Switch>
            <Route path="/customers" exact component={ConnectedCustomerList} />
            <Route path="/customers/:id" component={ConnectedCustomerDetails} />
            <Route path="*">
                <Redirect to="/customers" />
            </Route>
        </Switch>
    </Router>
);
