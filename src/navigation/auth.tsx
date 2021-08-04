import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../components/header/AppHeader";
import AuthScreen from "../screens/auth/AuthScreen";
import ResetScreen from "../screens/auth/ResetScreen";
import NoMatchScreen from "../screens/header/NoMatchScreen";

const AuthNavigation = () => {
    return (
        <Router>
            {/* <AppHeader /> */}
            <Switch>
                <Route path='/' component={AuthScreen} exact />
                <Route path='/reset/:id' component={ResetScreen} />
                <Route component={NoMatchScreen} />
            </Switch>
        </Router>
    );
};

export default AuthNavigation;
