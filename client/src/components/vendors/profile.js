import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import queryString from "query-string";
import { searchViews } from '../../actions/admin/vendorActions';
import { getByHandleVendor, updateProfileView, markFavourite } from "../../actions/admin/vendorActions";
import { chatInit } from "../../actions/chatinitActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      vendor: {},
      fav: {},
      toggle: true
    };
  }

  componentDidMount() {
    // console.log(queryString.parse(this.props.location.search).plan);
    if (queryString.parse(this.props.location.search).plan == "true") {
      this.props.searchViews(this.props.match.params.handle);
    }
    this.setState({ handle: this.props.match.params.handle });
    this.props.getByHandleVendor(this.props.match.params.handle);
    this.props.updateProfileView(this.props.match.params.handle);
  }

  markFav(e) {
    e.preventDefault();
    const handle = this.props.match.params.handle;
    this.props.markFavourite(handle);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.vendor) {
      this.setState({ vendor: nextProps.vendor });
      this.setState({ fav: nextProps.vendor.fav });
    }
  }

  checkReceiver(id) {
    // console.log(id);
    // console.log(id);
    this.props.chatInit(id);
  }

  render() {
    const { vendor } = this.props.vendor;
    // console.log(this.state);
    return (
      <div id="slider" style={{ marginTop: "50px" }}>
        <div className="container-fluid" style={{ padding: "0px" }}>
          <div
            className="row"
            style={{
              marginRight: "0px",
              marginLeft: "0px",
              flexWrap: "wrap-reverse"
            }}
          >
            <div
              className="col-lg-4 col-md-12 col-xs-12 col-sm-12 left-panel-profile"
              style={{ padding: "0px", marginTop: '50px' }}
            >
              <div className="slide-data" style={{ marginTop: "7%" }}>
                <Link
                  to={"/vendors"}

                  className="btn btn-default btn-sm btn-profile-back"
                  style={{ fontSize: "14px", height: '30px', width: '107px', padding: '4px', borderRadius: '4px' }}
                >
                  Back
                </Link>
                <MDBBtn
                  onClick={this.markFav.bind(this)}
                  className="btn btn-default btn-sm btn-profile-back"
                  style={{ fontSize: "14px", marginLeft: "5px", height: '30px', width: '111px', padding: '4px', borderRadius: '4px' }}
                >
                  {this.state.fav && this.state.fav.success && "Added to Fav"}
                  {this.state.fav && !this.state.fav.success && "Add to Fav"}
                </MDBBtn>
                <br />
                <h5
                  style={{
                    display: "inline",
                    marginRight: "35px",
                    fontSize: "12px",
                    color: "black",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    this.setState({ toggle: true });
                  }}
                >
                  INFO
                </h5>
                <h5
                  style={{
                    display: "inline",
                    marginRight: "35px",
                    fontSize: "12px",
                    color: "black",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    this.setState({ toggle: false });
                  }}
                >
                  GALLERY
                </h5>
                {/* <h5
                  style={{
                    display: "inline",
                    marginRight: "35px",
                    fontSize: "12px",
                    color: "black"
                  }}
                >
                  REVIEWS
                </h5> */}
                <hr style={{ marginTop: "0.4rem" }} />
                <h3
                  className="text-uppercase"
                  style={{ marginBottom: "20px", fontSize: "20px" }}
                >
                  {vendor.name}
                </h3>
                <p style={{ fontSize: "13px", textAlign: "justify", textJustify: "inter-word" }}>
                  {vendor.description}</p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {this.props.auth.user.id !== vendor._id && vendor.msg && (
                    <Link
                      to={"#"}
                      style={{ marginTop: "12.5px", marginLeft: "-1px", fontSize: "12px", height: '30px', width: '100px', borderRadius: '8px', backgroundColor: '#1F1E1E' }}
                      className="col-md-4 col-sm-12 col-xs-12 btn btn-primary text-uppercase mybtn"
                      onClick={this.checkReceiver.bind(
                        this,
                        vendor.user ? vendor.user._id : ""
                      )}
                    >
                      message
                    </Link>
                  )}

                  {this.props.auth.user.id !== vendor._id && <br />}
                  <a
                    href={vendor.website ? vendor.website : "#"}
                    style={{ marginTop: "12.5px", marginLeft: "-1px", fontSize: "12px", height: '30px', width: '100px', borderRadius: '8px', backgroundColor: '#1F1E1E' }}
                    className="col-md-4 col-sm-12 col-xs-12 btn btn-primary text-uppercase mybtn"
                    target="_blank"
                  >
                    website
                  </a>{" "}
                  <a
                    href={vendor.instagram ? vendor.instagram : "#"}
                    style={{ marginTop: "12.5px", marginLeft: "-1px", fontSize: "12px", height: '30px', width: '100px', borderRadius: '8px', backgroundColor: '#1F1E1E' }}
                    className="col-md-4 col-sm-12 col-xs-12 btn btn-primary text-uppercase mybtn"
                    target="_blank"
                  >
                    Instagram
                  </a>
                  {/* <Link
                    to={vendor.phone ? vendor.phone : "#"}
                    style={{ marginTop: "12.5px", fontSize: "12px" }}
                    className="col-md-4 col-sm-12 col-xs-12 btn btn-primary text-uppercase mybtn"
                    target="_blank"
                  >
                    contact
                  </Link> */}
                </div>
              </div>
            </div>
            <div
              className="col-lg-8 col-md-12 col-xs-12 col-sm-12 right-panel-profile"
              style={{ padding: "0px", marginTop: "2%" }}
            >
              <div style={{ display: this.state.toggle ? "" : "none" }}>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    {vendor.slider &&
                      vendor.slider.map((item, index) => {
                        let flag = index === 0 ? "active" : "";
                        return (
                          <div
                            key={index}
                            className={"carousel-item myslide " + flag}
                          >
                            <img
                              src={item.img}
                              className="d-block w-100"
                              alt="..."
                            />
                          </div>
                        );
                      })}

                    {(!vendor.slider || vendor.slider.length < 1) && (
                      <div className={"carousel-item myslide active"}>
                        <img
                          src="https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png"
                          className="d-block "
                          style={{
                            width: "50% !important",
                            margin: "0 auto"
                          }}
                          alt="..."
                        />
                      </div>
                    )}
                  </div>
                  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div style={{ display: !this.state.toggle ? "" : "none" }}>
                <div className="container">
                  <div className="row galleryitems">
                    {vendor &&
                      vendor.slider &&
                      vendor.slider.map((image, index) => {
                        return (
                          <div
                            className="col-md-4"
                            key={index}
                            style={{
                              paddingRight: "5px",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              paddingLeft: "5px"
                            }}
                          >
                            <img src={image.img} className="img-fluid" />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getByHandleVendor: PropTypes.func.isRequired,
  updateProfileView: PropTypes.func.isRequired,
  markFavourite: PropTypes.func.isRequired,
  searchViews: PropTypes.func.isRequired,
  chatInit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  vendor: state.vendor
});

export default connect(
  mapStateToProps,
  { getByHandleVendor, chatInit, updateProfileView, markFavourite, searchViews }
)(Profile);
