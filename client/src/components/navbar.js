import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import notify_gif from './msg_notify.png';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    console.log(this.props);
    const { auth, ChatReducer } = this.props;
    let { notify } = ChatReducer;
    return (
      <div>
        <div id="top-menu" className="fixed-top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 ">
                <nav
                  className="navbar navbar-expand-lg navbar-light bg-light"
                  style={{ height: "65px", marginLeft: "-4%", marginRight: "-4%" }}
                >
                  <a
                    className="navbar-brand"
                    style={{ height: "65px" }}
                    href="./"
                  >
                    <img
                      className="logo"
                      src="https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png"
                      alt="logo"
                    />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                    style={{ backgroundColor: "white" }}
                  >
                    <ul className="navbar-nav mr-auto">
                      {/* <li className="nav-item active">
                        <Link className="nav-link text-uppercase" to={"/home"}>
                          Home
                        </Link>
                      </li> */}
                      <li className="nav-item">
                        <Link
                          className="nav-link text-uppercase"
                          to={"/vendors"}
                        >
                          vendors
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-uppercase" to={"/plan"}>
                          plan
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                        <Link className="nav-link text-uppercase" to={"/"}>
                          about us
                        </Link>
                      </li> */}

                      {auth.isAuthenticated && auth.user.user_type === "1" && (
                        <li className="nav-item">
                          <a className="nav-link text-uppercase" href="/admin">
                            Dashboard
                          </a>
                        </li>
                      )}
                      {auth.isAuthenticated && auth.user.user_type === "2" && (
                        <li className="nav-item">
                          <a
                            className="nav-link text-uppercase"
                            href="/vendor/dashboard"
                          >
                            Dashboard
                          </a>
                        </li>
                      )}
                      {auth.isAuthenticated && auth.user.user_type === "3" && (
                        <li className="nav-item">
                          <a
                            className="nav-link text-uppercase"
                            href="/dashboard"
                          >
                            Dashboard
                          </a>
                        </li>
                      )}
                      {auth.isAuthenticated && auth.user.user_type != '1' && (
                        <li className="nav-item">
                          <a
                            className="nav-link text-uppercase"
                            href='/inbox'
                          >
                            Inbox {notify && <img src={notify_gif} style={{ width: '13px', height: '13px' }} />}
                          </a>
                        </li>
                      )}
                      {auth.isAuthenticated && (
                        <li className="nav-item">
                          <a
                            className="nav-link text-uppercase"
                            href="#"
                            onClick={this.onLogoutClick.bind(this)}
                          >
                            Logout
                          </a>
                        </li>
                      )}
                      {!auth.isAuthenticated && (
                        <li className="nav-item">
                          <Link
                            className="nav-link text-uppercase"
                            to={"/login"}
                          >
                            Login
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  ChatReducer: state.ChatReducer,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
