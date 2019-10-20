import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdminUser } from "../../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginAdminUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    // console.log(errors);

    return (
      <section
        id="vendor2"
        class="gallery adminpanellogin"
        style={{ marginTop: "50px" }}
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12 right-content">
              <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane show active">
                  <div class="container">
                    <div id="contact">
                      <div class="container">
                        <div class="row">
                          <div class="col-md-4 offset-md-4 col-sm-12">
                            <div class="contact-white" style={{ width: '80%' }}>
                              <h3 class="text-uppercase text-center">
                                Admin Panel
                              </h3>
                              <form onSubmit={this.onSubmit}>
                                <div class="form-row">
                                  <div class="form-group form-group-mb-0 col-md-12">
                                    <input
                                      type="email"
                                      className="form-control"
                                      value={this.state.email}
                                      onChange={this.onChange}
                                      id="email"
                                      name="email"
                                      aria-describedby="email"
                                      placeholder="Your Email"
                                    />
                                    {errors.email && (
                                      <div
                                        className="error"
                                        style={{ color: "red" }}
                                      >
                                        {errors.email}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div class="form-group form-group-mb-0">
                                  <input
                                    type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    id="password"
                                    name="password"
                                    placeholder="Password"
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
                                <div class="form-group form-group-mb-0 text-center">
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
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  loginAdminUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginAdminUser }
)(Login);
