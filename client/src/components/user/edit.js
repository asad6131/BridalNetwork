import React, { Component } from 'react';
import InnerNav from "../innerNav";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getUser, UpdateUser } from "../../actions/authActions";

class Fav_Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }

  componentDidMount() {
    this.props.myFav();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.vendor) {
    // this.setState({ fav: nextProps.vendor.fav });
    // }
  }
  render() {
    return (
      <section
        id="vendor2"
        className="gallery traffic"
        style={{ marginTop: "50px" }}
      >
        <div className="container-fluid">
          <div className="row">
            <InnerNav />
            <div className="col-md-10 right-content">
              <div className="container-fluid h-100">
                <div id="contact" style={{ textAlign: "left" }}>
                  <div className="container">
                    <div className="row">
                      <div className="container">
                        <div
                          className="contact-white"
                          style={{ padding: "50px 48px" }}
                        >
                          <h3 className="text-uppercase text-center">
                            Profile
                            </h3>

                          edit profile here
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}



Fav_Vendor.propTypes = {
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
)(Fav_Vendor);
