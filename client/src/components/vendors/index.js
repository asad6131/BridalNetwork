import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategories } from "../../actions/admin/categoryActions";
import { getVendors } from "../../actions/admin/vendorActions";

class Vendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      errors: {},
      vendors: []
    };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getVendors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.vendor) {
      this.setState({ vendors: nextProps.vendor.vendors });
    }

    if (nextProps.category) {
      this.setState({ categories: nextProps.category.categories });
    }
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <div id="vendors">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={"nav-link text-uppercase btn2 active"}
                      data-toggle="pill"
                      href={"#pills-A1"}
                      role="tab"
                    >
                      All
                    </a>
                  </li>
                  {this.state.categories.map((cat, index) => {
                    return (
                      <li className="nav-item">
                        <a
                          className={"nav-link text-uppercase btn2"}
                          key={index}
                          data-toggle="pill"
                          href={"#pills-" + cat._id}
                          role="tab"
                        >
                          {cat.name}
                        </a>
                      </li>
                    );
                  })}
                  {/* <li className="nav-item">
										<a className="nav-link active text-uppercase btn1" data-toggle="pill" href="#pills-bridal" role="tab">bridal wear</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-uppercase btn2" data-toggle="pill" href="#pills-photography" role="tab">photography</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-uppercase btn3" data-toggle="pill" href="#pills-cinematogrphy" role="tab">cinematogrphy</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-uppercase btn4" data-toggle="pill" href="#pills-others" role="tab">others</a>
									</li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className="bluebg container-fluid">
            <div className="tab-content" id="pills-tabContent">
              <div
                className={"tab-pane fade show active"}
                id={"pills-A1"}
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="wrapper p-0">
                  <div className="row justify-content-md-center">
                    {this.state.vendors.map((v, index) => {
                      return (
                        <div class="col-md-4 col-sm-6">
                          <Link to={"/vendors/profile/" + v.handle}>
                            <div class="img-box">
                              <div
                                id="carouselExampleIndicators2"
                                class="carousel slide"
                                data-ride="carousel"
                              >
                                <ol class="carousel-indicators">
                                  <li
                                    data-target="#carouselExampleIndicators2"
                                    data-slide-to="0"
                                    class="active"
                                  />
                                  {v.slider.map((img, index) => {
                                    return (
                                      <li
                                        data-target="#carouselExampleIndicators2"
                                        data-slide-to={index + 1}
                                        class="active"
                                      />
                                    );
                                  })}
                                </ol>
                                <div class="carousel-inner">
                                  <div class="carousel-item active">
                                    <img
                                      src={
                                        v.avatar
                                          ? v.avatar
                                          : "https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png"
                                      }
                                      class="img-fluid"
                                      alt="vendor image 1"
                                    />
                                  </div>
                                  {v.slider.map((img, index) => {
                                    return (
                                      <div
                                        class="carousel-item"
                                        key={index + 1}
                                      >
                                        <img
                                          src={img.img}
                                          class="img-fluid"
                                          alt="vendor image 1"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div class="icon-love">
                                <div class="caption">
                                  {/* <h6 class="text-uppercase pt-2">ahrmaye photography</h6> */}
                                  <p class="text-uppercase pb-2">{v.name}</p>
                                </div>
                                <div class="love">
                                  <a href="#">
                                    <img
                                      src="assets/images/love-icon.png"
                                      alt="love-icon"
                                    />
                                  </a>
                                </div>
                              </div>
                              {v.featured && (
                                <div class="editor-choice">
                                  <img
                                    src="assets/images/editor-choice-tag.png"
                                    alt="editor-choice"
                                  />
                                </div>
                              )}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {this.state.categories.map((cat, index) => {
                return (
                  <div
                    className={"tab-pane fade show"}
                    id={"pills-" + cat._id}
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="wrapper p-0">
                      <div className="row justify-content-md-center">
                        {this.state.vendors.map((v, index) => {
                          return v.category._id === cat._id ? (
                            <div class="col-md-4 col-sm-6">
                              <Link to={"/vendors/profile/" + v.handle}>
                                <div class="img-box">
                                  <img
                                    src={
                                      v.avatar
                                        ? v.avatar
                                        : "https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png"
                                    }
                                    class="img-fluid"
                                    alt="vendor image 1"
                                  />
                                  <div class="icon-love">
                                    <div class="caption">
                                      {/* <h6 class="text-uppercase pt-2">ahrmaye photography</h6> */}
                                      <p class="text-uppercase pb-2">
                                        {v.name}
                                      </p>
                                    </div>
                                    <div class="love">
                                      <a href="#">
                                        <img
                                          src="assets/images/love-icon.png"
                                          alt="love-icon"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  {v.featured && (
                                    <div class="editor-choice">
                                      <img
                                        src="assets/images/editor-choice-tag.png"
                                        alt="editor-choice"
                                      />
                                    </div>
                                  )}
                                </div>
                              </Link>
                            </div>
                          ) : (
                              ""
                            );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Vendors.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  vendor: state.vendor,
  category: state.category
});

export default connect(
  mapStateToProps,
  { getCategories, getVendors }
)(Vendors);
