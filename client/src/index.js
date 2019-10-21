// comment for localhost only

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

// comment for live server only
import $ from 'jquery';
import Popper from 'popper.js';

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainRoute from "./MainRoute";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<MainRoute />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
