import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class innerNav extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="col-md-2 right-nav" style={{ marginTop: "4%" }}>
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {user.user_type === "2" && (
            <a className="nav-link text-uppercase active" >
              vendor panel
              {/* {this.props.auth.user.first_name}{" "}
              {this.props.auth.user.last_name} */}
            </a>
          )}
          {user.user_type === "1" && (
            <a className="nav-link text-uppercase active" >

              admin panel
            </a>
          )}
          {user.user_type === "3" && (
            <a className="nav-link text-uppercase active">
              user panel
            </a>
          )}

          {/* {user.user_type === "3" && <a className="nav-link" href="/dashboard">Dashboard</a>} */}
          {/* {user.user_type === "3" && <a className="nav-link" href="/edit">Edit Details</a>} */}
          {user.user_type === "2" && (
            <a href="/vendor/edit" className="nav-link text-uppercase" >
              edit details
            </a>
          )}
          {user.user_type === "2" && (
            <a href="/inbox" className="nav-link text-uppercase">
              inbox
            </a>
          )}
          {user.user_type === "1" && (
            <a href="/inbox" className="nav-link text-uppercase">
              inbox
            </a>
          )}
          {user.user_type === "2" && (
            <a className="nav-link text-uppercase" href="/vendor/gallery">
              gallery
            </a>
          )}
          {user.user_type === "3" && (
            <a href="/inbox" className="nav-link text-uppercase">
              inbox
            </a>
          )}
          {user.user_type === "3" && <a className="nav-link text-uppercase" href="/fav-vendor">saved vendors</a>}
          {user.user_type === "3" && <a className="nav-link text-uppercase">result page</a>}
          <a className="nav-link text-uppercase" href="/change-password">
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
