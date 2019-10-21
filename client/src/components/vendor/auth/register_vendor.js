import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { registerAdmin } from "../../../actions/authActions";
import { MDBBtn } from "mdbreact";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerAdmin(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <section
        id="vendor2"
        className="gallery adminpanellogin"
        style={{ marginTop: "50px" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 right-content">
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane show active">
                  <div className="container">
                    <div id="contact">
                      <div className="container">
                        <div className="row">
                          <div class="col-md-4 offset-md-4 col-sm-12">
                            <div class="contact-white" style={{ width: '80%', marginTop: "30%" }}>
                              <h3 className="text-uppercase text-center" style={{ fontSize: '16px' }}>
                                Vendor Register
                              </h3>
                              <form onSubmit={this.onSubmit}>
                                <div className="form-row">
                                  <div className="form-group form-group-mb-0 col-md-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={this.state.first_name}
                                      onChange={this.onChange}
                                      id="first_name"
                                      name="first_name"
                                      aria-describedby="first_name"
                                      placeholder="First Name"
                                      style={{ marginBottom: '5px', fontSize: '12px', textTransform: 'uppercase' }}
                                    />
                                    {errors.first_name && (
                                      <div
                                        className="error"
                                        style={{ color: "red", fontSize: "13px" }}
                                      >
                                        {errors.first_name}
                                      </div>
                                    )}
                                  </div>
                                  <div className="form-group form-group-mb-0 col-md-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={this.state.last_name}
                                      onChange={this.onChange}
                                      id="last_name"
                                      name="last_name"
                                      aria-describedby="last_name"
                                      placeholder="Last Name"
                                      style={{ marginBottom: '5px', fontSize: '12px', textTransform: 'uppercase' }}
                                    />
                                    {errors.last_name && (
                                      <div
                                        className="error"
                                        style={{ color: "red", fontSize: "13px" }}
                                      >
                                        {errors.last_name}
                                      </div>
                                    )}
                                  </div>
                                  <div className="form-group form-group-mb-0 col-md-12">
                                    <input
                                      type="email"
                                      className="form-control"
                                      value={this.state.email}
                                      onChange={this.onChange}
                                      id="email"
                                      name="email"
                                      aria-describedby="email"
                                      placeholder="Your Email"
                                      style={{ marginBottom: '5px', fontSize: '12px', textTransform: 'uppercase' }}

                                    />
                                    {errors.email && (
                                      <div
                                        className="error"
                                        style={{ color: "red", fontSize: "13px" }}
                                      >
                                        {errors.email}
                                      </div>
                                    )}
                                  </div>
                                  <div className="form-group form-group-mb-0 col-md-12">
                                    <input
                                      type="password"
                                      className="form-control"
                                      value={this.state.password}
                                      onChange={this.onChange}
                                      id="password"
                                      name="password"
                                      placeholder="PASSWORD"
                                      style={{ marginBottom: '5px', fontSize: '12px' }}
                                    />
                                    {errors.password && (
                                      <div
                                        className="error"
                                        style={{ color: "red", fontSize: "13px" }}
                                      >
                                        {errors.password}
                                      </div>
                                    )}
                                  </div>
                                  <div className="form-group form-group-mb-0 col-md-12">
                                    <input
                                      type="password"
                                      className="form-control"
                                      value={this.state.password2}
                                      onChange={this.onChange}
                                      id="password2"
                                      name="password2"
                                      placeholder="CONFIRM PASSWORD"
                                      style={{ marginBottom: '5px', fontSize: '12px' }}
                                    />
                                    {errors.password2 && (
                                      <div
                                        className="error"
                                        style={{ color: "red", fontSize: "13px" }}
                                      >
                                        {errors.password2}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="form-group form-group-mb-0 text-center">
                                  <MDBBtn
                                    type="submit"
                                    value="Submit"
                                    style={{ textTransform: 'uppercase', fontSize: '12px' }}
                                    className="button btn btn-light w-100 mysubmit savebtn">
                                    SUBMIT
                                  </MDBBtn >
                                </div>
                              </form>
                              <br />
                              <Link className="authTextReg" to={'/vendor/login'}>Login as Vendor</Link>
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
        </div>
      </section>
    );
  }
}

Register.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerAdmin }
)(withRouter(Register));
