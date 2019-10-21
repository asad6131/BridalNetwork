import React, { Component } from 'react';
import InnerNav from "../innerNav";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  myFav,
} from "../../actions/admin/vendorActions";
import { isArray } from 'util';

class Fav_Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: []
    }
  }

  componentDidMount() {
    this.props.myFav();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vendor) {
      if (isArray(nextProps.vendor.fav)) {
        this.setState({ fav: nextProps.vendor.fav });
        console.log(nextProps.vendor.fav);
      }
    }
  }
  render() {
    const { vendor } = this.props;
    // console.log(vendor && vendor.fav);
    return (
      <section
        id="vendor2"
        className="gallery traffic"
        style={{ marginTop: "50px" }}
      >
        <div className="container-fluid">
          <div className="row flex-column-reverse flex-md-row">
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
                            Favourites
                            </h3>

                          <div className="row">
                            {this.state && this.state.fav && this.state.fav.map((v, index) => {
                              v = v.vendor;
                              let bgImg = v.avatar
                                ? "url('" + v.avatar + "')" + " no-repeat center"
                                : "url('https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png')" +
                                " no-repeat center";
                              return (
                                <div
                                  className="col-md-4 col-sm-6 col-xs-6"
                                  style={{ paddingRight: '7px', paddingLeft: '7px' }}
                                  key={index + "_v"}
                                >
                                  <Link to={"/vendors/profile/" + v.handle}>
                                    <div class="img-box slider" >
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
                              );
                            })}
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
    )
  }
}



Fav_Vendor.propTypes = {
  myFav: PropTypes.func.isRequired,
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
  { myFav }
)(Fav_Vendor);
