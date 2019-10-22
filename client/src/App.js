import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  connectSocket
} from "./actions/authActions";

import "./App.css";
import store from "./store";
import PrivateRoute from "./routes/private";

import Navbar from "./components/navbar";
// ****************** Admin Routes Starts ****************** //
import AdminLogin from "./components/admin/auth/login";
import Admin_Plans from "./components/admin/plans";
// import Admin from './components/admin';
import Admin_Vendor from "./components/admin/vendors";
import Admin_Categories from "./components/admin/categories";
import Admin_Vendor_Add from "./components/admin/vendors/add";
import Admin_Vendor_Update from "./components/admin/vendors/new_update";
import Admin_Vendor_Slider from "./components/admin/vendors/gallery";
import Admin_Categories_Add from "./components/admin/categories/add";
// ****************** Admin Routes Ends ****************** //
// ****************** Vendor Routes Starts ****************** //
import VendorLogin from "./components/vendor/auth/login_vendor";
import VendorRegister from "./components/vendor/auth/register_vendor";
import VendorDashboard from "./components/vendor/dashboard";
import VendorEdit from "./components/vendor/profile";
import VendorGallery from "./components/vendor/gallery";
// ****************** Vendor Routes Ends ****************** //
// import Register from "./components/auth/register";
import Login from "./components/user/auth/login";
import Register from "./components/user/auth/register";
import Home from "./components/";
import Search from "./components/search";
import Dashboard from "./components/dashboard";
import Vendors2 from "./components/vendors_new";
import Vendors_Profile from "./components/vendors/profile";
import Vendors_Category from "./components/vendors";
// import Inbox from "./components/inbox";
import Inbox from "./components/chat/chat";
import Fav_Vendor from "./components/user/fav_vendor.js";
import Edit_User from "./components/user/edit.js";
import Chat from "./components/inbox/chat";
import ChangePassword from "./components/changepassword";

import * as firebase from "firebase";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDxOzOikWO1Xs0cll8AEBXF0F72tQdcDKE",
      authDomain: "bridal-network-e9867.firebaseapp.com",
      databaseURL: "https://bridal-network-e9867.firebaseio.com",
      projectId: "bridal-network-e9867",
      storageBucket: "bridal-network-e9867.appspot.com",
      messagingSenderId: "1077541484514",
      appId: "1:1077541484514:web:81111915366eb517"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.props.connectSocket();
  }

  render() {
    return (
      // <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            {/* ****************** Admin Routes Starts ****************** */}
            <Route path="/admin/login" exact component={AdminLogin} />
            <PrivateRoute
              exact
              path="/admin/vendors/slider/:handle"
              component={Admin_Vendor_Slider}
            />
            <PrivateRoute
              exact
              path="/admin/vendors/update/:handle"
              component={Admin_Vendor_Update}
            />
            <PrivateRoute
              exact
              path="/admin/vendors/add"
              component={Admin_Vendor_Add}
            />
            <PrivateRoute
              exact
              path="/admin/vendors"
              component={Admin_Vendor}
            />
            <PrivateRoute exact path="/admin/plans" component={Admin_Plans} />
            <PrivateRoute
              exact
              path="/admin/categories/add"
              component={Admin_Categories_Add}
            />
            <PrivateRoute
              exact
              path="/admin/categories"
              component={Admin_Categories}
            />
            <PrivateRoute exact path="/admin" component={Admin_Vendor} />
            <PrivateRoute
              exact
              path="/admin/dashboard"
              component={Admin_Vendor}
            />
            {/* ****************** Admin Routes Ends ****************** */}

            {/* ****************** Vendor Routes Starts ****************** */}
            <Route path="/vendor/login" component={VendorLogin} />
            <Route path="/vendor/register" component={VendorRegister} />
            <PrivateRoute
              path="/vendor/dashboard"
              component={VendorDashboard}
            />
            <PrivateRoute path="/vendor/inbox/:id" component={Chat} />
            <PrivateRoute path="/vendor/inbox" component={Inbox} />
            <PrivateRoute path="/vendor/edit" component={VendorEdit} />
            <PrivateRoute path="/vendor/gallery" component={VendorGallery} />
            <PrivateRoute path="/vendor" component={VendorDashboard} />
            {/* ****************** Vendor Routes Ends ****************** */}

            {/* ****************** User Routes Starts ****************** */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* ****************** User Routes Ends ****************** */}
            <Route
              path="/vendors/profile/:handle"
              component={Vendors_Profile}
            />
            <Route path="/search" component={Search} />
            <Route path="/vendors" component={Vendors2} />
            {/* <Route path="/vendors2" component={Vendors2} /> */}
            <Route path="/home" component={Home} />
            {/* <PrivateRoute path="/inbox/:id" component={Chat} /> */}
            {/* <PrivateRoute path="/inbox" component={Inbox} /> */}
            <PrivateRoute path="/fav-vendor" component={Fav_Vendor} />
            <PrivateRoute path="/plan" component={Dashboard} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/dashboard" component={Inbox} />
            {/* //mdb chat */}
            <PrivateRoute path="/inbox" component={Inbox} />
            <Route path="/" component={Vendors2} />
          </Switch>
          {/*<Route exact path="/not-found" component={NotFound} />*/}
        </div>
      </Router>
      // </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    connectSocket: () => dispatch(connectSocket())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
