import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MDBBtn, MDBView, MDBMask } from "mdbreact";
import Cached from "@material-ui/icons/Cached";
import { connect } from "react-redux";
import { getCategories } from "../actions/admin/categoryActions";
import {
  getVendorsUnderBudget,
  getByHandleVendorWithCat,
  getVendorsSkipLimit
} from "../actions/admin/vendorActions";
import { isArray } from "util";
import isEmpty from "../validation/is-empty";
// import queryString from "query-string";

class Vendors_new extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      errors: {},
      vendors: [],
      vendor: {},
      category: {},
      slider: [],
      toggle: [],
      all_cat: false,
      select_cat: ''
    };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getVendorsSkipLimit('', 0, 9);
  }

  changeCat = () => {
    this.setState({ all_cat: !this.state.all_cat });
  }

  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      // console.log(nextProps.errors, ' errorrrrrrrrrrr');
    }

    if (nextProps.vendor) {
      if (isArray(nextProps.vendor.vendors)) {
        let featured = [];
        let nonfeatured = [];
        let all = [];
        nextProps.vendor.vendors.forEach(element => {
          if (element.top === true) {
            featured.push(element);
          } else {
            nonfeatured.push(element);
          }
        });
        all = featured;
        this.shuffle(nonfeatured).forEach(e => {
          all.push(e);
        });
        let preVendors = this.state.vendors;
        all = preVendors.concat(all);
        let result = [];
        let map = new Map();
        for (let item of all) {
          if (!map.has(item._id)) {
            map.set(item._id, true);    // set any value to Map
            result.push(item);
          }
        }
        // console.log(result);
        this.setState({ vendors: result });
        // this.setState({ vendors: all });
      }
    }

    if (nextProps.vendor) {
      this.setState({ vendor: nextProps.vendor.vendor });
    }

    if (nextProps.vendor) {
      this.setState({ category: nextProps.vendor.vendor.category });
    }

    if (nextProps.vendor) {
      this.setState({ slider: nextProps.vendor.vendor.slider });
      // console.log(nextProps.vendor);
    }

    if (nextProps.category) {
      this.setState({ categories: nextProps.category.categories });
      let tog = [];
      tog[0] = true;
      // console.log(this.state.select_cat, ' select category');
      nextProps.category.categories.map((item, index) => {
        // console.log(item._id);
        if (item._id != this.state.select_cat) {
          tog[index + 1] = false;
        } else {
          // console.log(item._id, ' from else statement');
          // console.log('111111111111111111111111111111111111111');
          tog[index + 1] = true;
        }
      })
      this.setState({ toggle: tog });
    }
  }

  fetchVender(handle) {
    this.props.getByHandleVendorWithCat(handle);
  }

  loadMore(cat_id) {
    let skip = this.state.vendors.length;
    // console.log(cat_id);
    this.setState({ select_cat: cat_id });
    this.fetchVendors(cat_id, skip, 6);
  }

  handleCategoryToggle(id, cat_id) {
    this.setState({ select_cat: cat_id });
    let tog = [];
    this.setState({ all_cat: false });
    tog[id] = true;
    this.state.toggle.forEach((item, index) => {
      if (index + 1 !== id) {
        tog[index + 1] = false;
      }
    });
    this.setState({ toggle: tog });
    this.fetchVendors(cat_id, this.state.vendors.length, 9);
  }

  fetchVendors(cat, skip, limit) {
    // console.log(cat);
    if (this.state.select_cat != cat) {
      this.setState({ vendors: [] });
      this.props.getVendorsSkipLimit(cat, 0, limit);
    } else {
      this.props.getVendorsSkipLimit(cat, skip, limit);
    }

  }

  render() {
    // console.log(this.state, '///////////////');
    return (
      <div>
        <section id="vendor2" style={{ marginTop: "40px" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 left-nav stuck" style={{ marginBottom: "30px", marginTop: "4%" }}>
                <div
                  className="nav  flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    onClick={this.changeCat}
                    className={"nav-link text-uppercase active"}
                    data-toggle="tab"
                    href={"#pills_1A"}
                    role="tab"
                    onClick={() => {
                      this.setState({ all_cat: !this.state.all_cat });
                    }}
                  >
                    All Categories
                  </a>
                  {this.state.categories.map((cat, index) => {
                    return (
                      <a
                        style={{ display: (this.state.all_cat || this.state.toggle[index + 1]) ? 'block' : 'none' }}
                        className={"nav-link text-uppercase  navvLink "}
                        key={index + "_cat_toggle"}
                        data-toggle="tab"
                        href={"#pills_" + cat._id}
                        role="tab"
                        onClick={this.handleCategoryToggle.bind(this, index + 1, cat._id)}
                      >
                        {cat.name}
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-10 right-content not-stuck" style={{ marginTop: "20px" }}>
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className={"tab-pane fade show active "}
                    id={"pills_1A"}
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="container" >
                      <div className="row">
                        {this.state.vendors && this.state.vendors.length > 0 && this.state.vendors.map((v, index) => {
                          // console.log(v.category.name == null ? v.handle : v.category.name, 'aaaaaaaaaaaaa');
                          let bgImg = v.avatar
                            ? "url('" + v.avatar + "')" + " no-repeat center"
                            : "url('https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png')" +
                            " no-repeat center";
                          return (

                            <div
                              className="col-md-4 col-sm-6 col-xs-6 "
                              key={index + "_v"}
                            >
                              <div class="img-box slider">
                                <div
                                  id={
                                    "carouselExampleIndicators2" +
                                    "_" +
                                    v.handle
                                  }
                                  class="carousel slide"
                                  data-ride="carousel"
                                >
                                  <ol class="carousel-indicators">

                                    <li
                                      data-target={
                                        "#carouselExampleIndicators2" +
                                        "_" +
                                        v.handle
                                      }
                                      data-slide-to="0"
                                      class="active"
                                    />
                                    {v.slider.map((img, index) => {
                                      return (
                                        <li
                                          data-target={
                                            "#carouselExampleIndicators2" +
                                            "_" +
                                            v.handle
                                          }
                                          key={'asd' + index}
                                          data-slide-to={index + 1}
                                        />
                                      );
                                    })}
                                  </ol>
                                  <div class="carousel-inner">
                                    <div
                                      class="carousel-item active"
                                      key={index + 1}
                                      style={{
                                        maxHeight: '225px',
                                        minHeight: '225px',
                                        backgroundSize: 'cover',
                                        backgroundImage: `url('${v.avatar
                                          ? v.avatar
                                          : "https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png"}')`,
                                        backgroundPosition: 'center center'
                                      }}
                                    >
                                    </div>
                                    {v.slider.map((img, index) => {
                                      return (

                                        <div
                                          class="carousel-item"
                                          key={index + 1}
                                          style={{
                                            maxHeight: '225px',
                                            minHeight: '225px',
                                            backgroundSize: 'cover',
                                            backgroundImage: `url('${img.img}')`,
                                            backgroundPosition: 'center center'
                                          }}
                                        >
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="icon-love">
                                  <Link to={"/vendors/profile/" + v.handle}>
                                    <div className="caption">
                                      <p
                                        className="text-uppercase pb-2"
                                        style={{
                                          marginBottom: "-7px",
                                          paddingBottom: "0px",
                                          marginTop: "14px"
                                        }}
                                      >
                                        <strong>{!isEmpty(v.name) ? v.name : ''}</strong>
                                      </p>
                                      <p
                                        className="text-uppercase"
                                        style={{
                                          marginBottom: "0px",
                                          paddingBottom: "0px",
                                          marginTop: "0px",
                                          fontSize: "11px"
                                        }}
                                      >
                                        {v.category.name}
                                      </p>
                                    </div>
                                  </Link>
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
                            </div>
                          );
                        })}
                      </div>
                      <div className="row">
                        <MDBBtn
                          rounded
                          style={{ width: "150px" }}
                          className="button"
                          onClick={this.loadMore.bind(this, '')}
                        >
                          <Cached style={{ marginRight: "4px", marginBottom: "2px", width: "18px", height: "18px" }} />
                          Load More</MDBBtn>
                      </div>


                    </div>
                  </div>

                  {this.state.categories.map((cat, index) => {
                    return (
                      <div
                        className={"tab-pane fade show "}
                        key={index + "_cat"}
                        id={"pills_" + cat._id}
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div className="container">
                          <div className="row">

                            {this.state.vendors.map((v, index) => {
                              let bgImg = v.avatar
                                ? "url('" +
                                v.avatar +
                                "')" +
                                " no-repeat center"
                                : "url('https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png')" +
                                " no-repeat center";
                              return v.category._id === cat._id ? (
                                <div
                                  className="col-md-4 col-sm-6 col-xs-6"
                                  key={index + "_v"}
                                >
                                  <Link to={"/vendors/profile/" + v.handle}>
                                    <div class=" slider img-box">
                                      <div
                                        id={
                                          "carouselExampleIndicators21" +
                                          "_" +
                                          v.handle
                                        }
                                        class="carousel slide"
                                        data-ride="carousel"
                                      >
                                        <ol class="carousel-indicators">
                                          <li
                                            data-target={
                                              "#carouselExampleIndicators21" +
                                              "_" +
                                              v.handle
                                            }
                                            data-slide-to="0"
                                            class="active"
                                          />
                                          {v.slider.map((img, index) => {
                                            return (
                                              <li
                                                data-target={
                                                  "#carouselExampleIndicators21" +
                                                  "_" +
                                                  v.handle
                                                }
                                                key={'asd' + index}
                                                data-slide-to={index + 1}
                                              />
                                            );
                                          })}
                                        </ol>
                                        <div class="carousel-inner">
                                          <div
                                            class="carousel-item active"
                                            key={index + 1}
                                            style={{
                                              maxHeight: '225px',
                                              minHeight: '225px',
                                              backgroundSize: 'cover',
                                              backgroundImage: `url('${v.avatar
                                                ? v.avatar
                                                : "https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png"}')`,
                                              backgroundPosition: 'center center'
                                            }}
                                          >
                                          </div>
                                          {v.slider.map((img, index) => {
                                            return (

                                              <div
                                                class="carousel-item"
                                                key={index + 1}
                                                style={{
                                                  maxHeight: '225px',
                                                  minHeight: '225px',
                                                  backgroundSize: 'cover',
                                                  backgroundImage: `url('${img.img}')`,
                                                  backgroundPosition: 'center center'
                                                }}
                                              >
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                      <div class="icon-love">
                                        <div class="caption">
                                          <p
                                            class="text-uppercase pb-2"
                                            style={{
                                              marginBottom: "-7px",
                                              paddingBottom: "0px",
                                              marginTop: "14px"
                                            }}
                                          >
                                            <strong>{v.name}</strong>
                                          </p>
                                          <p
                                            class="text-uppercase"
                                            style={{
                                              marginBottom: "0px",
                                              paddingBottom: "0px",
                                              marginTop: "0px",
                                              fontSize: "11px"
                                            }}
                                          >
                                            {v.category.name}
                                          </p>
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
                          <div className="row">
                            <MDBBtn
                              rounded
                              style={{ width: "150px" }}
                              className="button"
                              onClick={this.loadMore.bind(this, '')}
                            >
                              <Cached style={{ marginRight: "4px", marginBottom: "2px", width: "18px", height: "18px" }} />
                              Load More</MDBBtn>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Vendor Details
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h6>Name</h6>
                <p>
                  {this.state.vendor && this.state.vendor.name
                    ? this.state.vendor.name
                    : "-"}
                </p>
                <h6>Category</h6>
                <p>
                  {this.state.category && this.state.category.name
                    ? this.state.category.name
                    : "-"}
                </p>
                <h6>Cost</h6>
                <p>
                  {this.state.vendor && this.state.vendor.price
                    ? "$" + this.state.vendor.price
                    : "-"}
                </p>
                <h6>Brochure</h6>
                <p>
                  {this.state.vendor && !this.state.vendor.pdf ? (
                    <a href={this.state.vendor.pdf} download>
                      Download
                    </a>
                  ) : (
                      "-"
                    )}
                </p>
                <h6>Website</h6>
                <p>
                  {this.state.vendor && this.state.vendor.website
                    ? this.state.vendor.website
                    : "-"}
                </p>
                <h6>Phone</h6>
                <p>
                  {this.state.vendor && this.state.vendor.phone
                    ? this.state.vendor.phone
                    : "-"}
                </p>
                <h6>Instagram</h6>
                <p>
                  {this.state.vendor && this.state.vendor.instagram
                    ? this.state.vendor.instagram
                    : "-"}
                </p>
                <h6>Gallery</h6>
                {this.state.slider &&
                  this.state.slider.map((item, index) => {
                    return (
                      <img
                        src={item.img}
                        key={index}
                        style={{ maxWidth: "32.3333%" }}
                        class="img-thumbnail img-responsive"
                        alt="Gallery"
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Vendors_new.propTypes = {
  getVendorsSkipLimit: PropTypes.func.isRequired,
  getByHandleVendorWithCat: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getVendorsUnderBudget: PropTypes.func.isRequired,
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
  { getCategories, getVendorsUnderBudget, getByHandleVendorWithCat, getVendorsSkipLimit }
)(Vendors_new);
