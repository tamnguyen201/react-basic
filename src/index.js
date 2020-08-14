import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import MyReducers from './reducers/CombineReducers';

import App from "./components/App";


const store = createStore(
    MyReducers,
    // composeEnhancers(applyMiddleware(thunk))
);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    , rootElement
);

serviceWorker.unregister();