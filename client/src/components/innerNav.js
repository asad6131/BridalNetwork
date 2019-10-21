import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

class innerNav extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="col-md-2 right-nav" style={{ marginTop: "8%" }}>
        <div style={{ marginTop: "-30px" }}>
          <img
            className="logo"
            src="https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png"
            alt="logo"
            width="200px"
            height="85px"
          />
        </div>
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {user.user_type === "2" && (
            <a className="nav-link text-uppercase active navvLink" >
              vendor panel
              {/* {this.props.auth.user.first_name}{" "}
              {this.props.auth.user.last_name} */}
            </a>
          )}
          {user.user_type === "1" && (
            <a className="nav-link text-uppercase active navvLink" >

              admin panel
            </a>
          )}
          {user.user_type === "3" && (
            <a className="nav-link text-uppercase active  navvLink">
              user panel
            </a>
          )}

          {/* {user.user_type === "3" && <a className="nav-link" href="/dashboard">Dashboard</a>} */}
          {/* {user.user_type === "3" && <a className="nav-link" href="/edit">Edit Details</a>} */}
          {user.user_type === "2" && (
            <a href="/vendor/edit" className="nav-link text-uppercase navvLink" >
              edit details
            </a>
          )}
          {user.user_type === "2" && (
            <a href="/inbox" className="nav-link text-uppercase navvLink">
              inbox
            </a>
          )}
          {user.user_type === "1" && (
            <a href="/inbox" className="nav-link text-uppercase navvLink">
              inbox
            </a>
          )}
          {user.user_type === "2" && (
            <a className="nav-link text-uppercase" href="/vendor/gallery navvLink">
              gallery
            </a>
          )}
          {user.user_type === "3" && (
            <a href="/inbox" className="nav-link text-uppercase navvLink">
              inbox
            </a>
          )}
          {user.user_type === "3" && <a className="nav-link text-uppercase navvLink" href="/fav-vendor">saved vendors</a>}
          {user.user_type === "3" && <a className="nav-link text-uppercase navvLink">result page</a>}
          <a className="nav-link text-uppercase navvLink" href="/change-password">
            Auth Settings
          </a>
        </div>
      </div>
    );
  }
}

innerNav.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(innerNav);
