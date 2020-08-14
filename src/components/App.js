import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import Routes from '../routes/routes';
import "../styles/style.css";
import ClientLayout from "./Client/layout";
import AdminLayout from "./Admin/layout";

const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
        {...rest}
        render={({ location }) =>
            fakeAuth.isAuthenticated ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}

const App = () => {
    return(
        <Router>
            {/* <ul className="menu">
                <li>
                    <Link to="/" >Client</Link>
                </li>
                <li>
                    <Link to="/admin" >Admin</Link>
                </li>
            </ul> */}

            <Switch>
                <PrivateRoute path="/admin/:path?/:path?/:path?" exact>
                    <AdminLayout />
                </PrivateRoute>
                <Route>
                    <ClientLayout />
                </Route>
            </Switch>

        </Router>
    );
}
export default App
