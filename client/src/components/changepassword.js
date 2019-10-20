import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InnerNav from "./innerNav";
import { changePassword } from "./../actions/authActions";


class Changepassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      password: "",
      npassword: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.setState({ user_id: nextProps.auth.user.id });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      user_id: this.state.user_id,
      password: this.state.password,
      npassword: this.state.npassword
    };

    // console.log(data);
    this.props.changePassword(data);
  };

  render() {
    const { errors } = this.state;
    return (
      <section
        id="vendor2"
        class="gallery traffic"
        style={{ marginTop: "5px" }}
      >
        <div class="container-fluid">
          <div class="row flex-column-reverse flex-md-row">
            <div class="col-md-10 right-content">
              <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane show active">
                  <div class="container">
                    <div
                      id="contact"
                      class="col-md-6 col-xs-12 col-sm-12 col-lg-6 offset-md-3"
                    >
                      <div class="container">
                        <div class="row">
                          <div class="col-md-12" style={{ marginTop: "17%", minWidth: "30%" }}>
                            <div class="contact-white">
                              <h3 class="text-uppercase text-center">
                                Change Password
                              </h3>
                              <div class="row">
                                <form onSubmit={this.onSubmit}>
                                  <div class="form-row">
                                    <div class="form-group col-md-12">
                                      <input
                                        type="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        id="password"
                                        name="password"
                                        placeholder="Old Password"
                                      />
                                      {errors.password && (
                                        <div
                                          className="error"
                                          style={{ color: "red" }}
                                        >
                                          {errors.password}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <input
                                      type="password"
                                      className="form-control"
                                      value={this.state.npassword}
                                      onChange={this.onChange}
                                      id="npassword"
                                      name="npassword"
                                      placeholder="New Password"
                                    />
                                    {errors.npassword && (
                                      <div
                                        className="error"
                                        style={{ color: "red" }}
                                      >
                                        {errors.npassword}
                                      </div>
                                    )}
                                  </div>
                                  <div class="form-group text-center">
                                    <input
                                      type="submit"
                                      value="Submit"
                                      class="btn btn-light w-100 mysubmit savebtn"
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <InnerNav />
          </div>
        </div>
      </section>
    );
  }
}

Changepassword.propTypes = {
  changePassword: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changePassword }
)(Changepassword);
