import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { MDBBtn, MDBView, MDBMask } from "mdbreact";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      loginError: false,
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signup = this.signup.bind(this);
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

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(res, type) {
    let postData;
    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }

    if (type === 'google' && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }
    if (postData) {
      console.log('success');
      console.log(postData);
      this.props.loginUser(postData);
      // PostData('signup', postData).then((result) => {
      //   let responseJson = result;
      //   sessionStorage.setItem("userData", JSON.stringify(responseJson));
      //   this.setState({ redirect: true });
      // });
    } else {
      console.log('failure');
    }
  }

  render() {
    const { errors } = this.state;
    // console.log(errors);
    const responseFacebook = (response) => {
      // console.log("facebook console");
      // console.log(response);
      this.signup(response, 'facebook');
    }

    const responseGoogle = (response) => {
      // console.log("google console");
      // console.log(response);
      this.signup(response, 'google');
    }

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
                          <div class="col-md-4 offset-md-4 col-sm-12 ">
                            <div class="contact-white" style={{ width: '80%', marginTop: "30%" }}>
                              <h3 class="text-uppercase text-center" style={{ fontSize: '16px' }}>Login</h3>
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
                                      style={{ marginBottom: '5px', fontSize: '12px', textTransform: 'uppercase' }}
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
                                    placeholder="PASSWORD"
                                    style={{ marginBottom: '5px', fontSize: '12px' }}
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
                                {/* <div class="form-group form-group-mb-0 text-center">
                                  <input
                                    variant="outlined"
                                    type="submit"
                                    value="Submit"
                                    style={{ fontSize: '12px', textTransform: 'uppercase' }}
                                    class="btn btn-light w-100 mysubmit savebtn"
                                  />
                                </div> */}
                                <div class="form-group form-group-mb-0 text-center">
                                  <MDBBtn
                                    type="submit"
                                    value="Submit"
                                    style={{ fontSize: '12px', textTransform: 'uppercase' }}
                                    className="button btn btn-light w-100 mysubmit savebtn"
                                  >
                                    Submit
                                  </MDBBtn >
                                </div>

                              </form>
                              <br />
                              <br />

                              {/* <FacebookLogin
                                appId={process.env.FACEBOOK_APP_ID || '1354962794657500'}
                                autoLoad={false}
                                cssClass="facebookButton"
                                fields="name,email,picture" render={renderProps => (
                                  <button
                                    class="btn btn-light w-100 mysubmit savebtn"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                  >
                                    LOGIN WITH FACEBOOK
                                  </button>
                                )}
                                callback={responseFacebook} /> */}
                              <GoogleLogin
                                clientId={process.env.GOOGLE_CLIENT_ID || '982841201859-n39vta0u7j0nttvvj040dqb3vlf0tedv.apps.googleusercontent.com'}
                                cssClass="googleButton"
                                render={renderProps => (
                                  <MDBBtn
                                    className="btn btn-light w-100 googleButton"
                                    style={{ fontSize: '12px' }}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                  >
                                    LOGIN WITH GOOGLE
                                  </MDBBtn>
                                )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle} />
                              <br />
                              <br />
                              <Link
                                to={'/register'}
                                className="authTextLg">
                                Register as new user
                              </Link>

                              <br />
                              <Link className="authTextSm" to={'/vendor/login'}>Sign in as Vendor</Link>
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
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
