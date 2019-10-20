import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import { Link } from "react-router-dom";
import InnerNav from "../innerNav"; 
import {
  updateVendorMain,
  getByUserID
} from "../../actions/admin/vendorActions";
import { getCategories } from "../../actions/admin/categoryActions";
import isEmpty from "../../validation/is-empty";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      errors: {},
      category: "",
      description: "",
      instagram: "",
      website: "",
      email: "",
      name: "",
      artist: "",
      file: "",
      berkat: "",
      cakes: "",
      stylist: "",
      makeup: "",

      bridal: false,
      outfits14: "",
      outfits17: "",
      outfits2: "",
      outfits3: "",
      outfits4: "",

      photography: false,
      event4: "",
      event8: "",
      eventout10: "",
      preeventout: "",

      videography: false,
      event4video: "",
      event8video: "",
      eventout10video: "",
      preeventoutvideo: "",

      catering: false,
      fcatering: "",
      fwcatering: "",

      vendor: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    if (this.props.auth.user.user_type === "3") {
      this.props.history.push("/");
    }
    this.props.getByUserID(this.props.auth.user.id);
    this.props.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.category) {
      this.setState({ categories: nextProps.category.categories });
    }

    if (nextProps.vendor) {
      this.setState({ vendor: nextProps.vendor.vendor });
      this.setState({ category: nextProps.vendor.vendor.category });
      this.setState({ description: nextProps.vendor.vendor.description });
      this.setState({ instagram: nextProps.vendor.vendor.instagram });
      this.setState({ website: nextProps.vendor.vendor.website });
      // this.setState({
      //   email: nextProps.vendor.vendor.user.email
      //     ? nextProps.vendor.vendor.user.email
      //     : ""
      // });
      this.setState({ name: nextProps.vendor.vendor.name });
      this.setState({ artist: nextProps.vendor.vendor.artist });
      this.setState({ file: nextProps.vendor.vendor.file });
      this.setState({ berkat: nextProps.vendor.vendor.berkat });
      this.setState({ cakes: nextProps.vendor.vendor.cakes });
      this.setState({ stylist: nextProps.vendor.vendor.stylist });
      this.setState({ makeup: nextProps.vendor.vendor.makeup });

      if (nextProps.vendor.vendor.category === "5cfe718627ef3e0844de5cf6") {
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[0].name === "1 OUTFIT 4HRS"
        ) {
          this.setState({
            outfits14:
              nextProps.vendor.vendor.price[0].min +
              " - " +
              nextProps.vendor.vendor.price[0].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[1].name === "1 OUTFIT 7HRS"
        ) {
          this.setState({
            outfits17:
              nextProps.vendor.vendor.price[1].min +
              " - " +
              nextProps.vendor.vendor.price[1].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[2].name === "2 OUTFIT"
        ) {
          this.setState({
            outfits2:
              nextProps.vendor.vendor.price[2].min +
              " - " +
              nextProps.vendor.vendor.price[2].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[3].name === "3 OUTFIT"
        ) {
          this.setState({
            outfits3:
              nextProps.vendor.vendor.price[3].min +
              " - " +
              nextProps.vendor.vendor.price[3].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[4].name === "4 OUTFIT"
        ) {
          this.setState({
            outfits4:
              nextProps.vendor.vendor.price[4].min +
              " - " +
              nextProps.vendor.vendor.price[4].max
          });
        }
      }

      if (nextProps.vendor.vendor.category === "5cfe717427ef3e0844de5cf5") {
        if (nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[0].name === "Event 4HRS") {
          this.setState({
            event4:
              nextProps.vendor.vendor.price[0].min +
              " - " +
              nextProps.vendor.vendor.price[0].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[1].name === "Event 8HRS"
        ) {
          this.setState({
            event8:
              nextProps.vendor.vendor.price[1].min +
              " - " +
              nextProps.vendor.vendor.price[1].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[2].name === "Event only + outdoor 10hrs"
        ) {
          this.setState({
            eventout10:
              nextProps.vendor.vendor.price[2].min +
              " - " +
              nextProps.vendor.vendor.price[2].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[3].name === "Pre wed + Event + Outdoor"
        ) {
          this.setState({
            preeventout:
              nextProps.vendor.vendor.price[3].min +
              " - " +
              nextProps.vendor.vendor.price[3].max
          });
        }
      }

      if (nextProps.vendor.vendor.category === "5cfe71a727ef3e0844de5cf7") {
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[0].name === "Event 4HRS"
        ) {
          this.setState({
            event4video:
              nextProps.vendor.vendor.price[0].min +
              " - " +
              nextProps.vendor.vendor.price[0].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[1].name === "Event 8HRS"
        ) {
          this.setState({
            event8video:
              nextProps.vendor.vendor.price[1].min +
              " - " +
              nextProps.vendor.vendor.price[1].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[2].name === "Event only + outdoor 10hrs"
        ) {
          this.setState({
            eventout10video:
              nextProps.vendor.vendor.price[2].min +
              " - " +
              nextProps.vendor.vendor.price[2].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[3].name === "Pre wed + Event + Outdoor"
        ) {
          this.setState({
            preeventoutvideo:
              nextProps.vendor.vendor.price[3].min +
              " - " +
              nextProps.vendor.vendor.price[3].max
          });
        }
      }

      if (nextProps.vendor.vendor.category === "5cfe71b627ef3e0844de5cf8") {
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[0].name === "Full Deco + Catering"
        ) {
          this.setState({
            fcatering:
              nextProps.vendor.vendor.price[0].min +
              " - " +
              nextProps.vendor.vendor.price[0].max
          });
        }
        if (
          nextProps.vendor.vendor &&
          nextProps.vendor.vendor.price.length > 0 &&
          nextProps.vendor.vendor.price[1].name === "Full Deco w/o Catering"
        ) {
          this.setState({
            fwcatering:
              nextProps.vendor.vendor.price[1].min +
              " - " +
              nextProps.vendor.vendor.price[1].max
          });
        }
      }

      if (nextProps.vendor.vendor.category === "5cfe717427ef3e0844de5cf5") {
        this.setState({
          photography: true,
          bridal: false,
          videography: false,
          catering: false
        });
      }
      if (nextProps.vendor.vendor.category === "5cfe718627ef3e0844de5cf6") {
        this.setState({
          photography: false,
          bridal: true,
          videography: false,
          catering: false
        });
      }
      if (nextProps.vendor.vendor.category === "5cfe71a727ef3e0844de5cf7") {
        this.setState({
          photography: false,
          bridal: false,
          videography: true,
          catering: false
        });
      }
      if (nextProps.vendor.vendor.category === "5cfe71b627ef3e0844de5cf8") {
        this.setState({
          photography: false,
          bridal: false,
          videography: false,
          catering: true
        });
      }
    }
  }

  handleCategoryOnChange = e => {
    this.setState({ category: e.target.value });
    switch (e.target.value) {
      case "5cfe717427ef3e0844de5cf5":
        this.setState({
          photography: true,
          bridal: false,
          videography: false,
          catering: false
        });
        break;
      case "5cfe718627ef3e0844de5cf6":
        this.setState({
          photography: false,
          bridal: true,
          videography: false,
          catering: false
        });
        break;
      case "5cfe71a727ef3e0844de5cf7":
        this.setState({
          photography: false,
          bridal: false,
          videography: true,
          catering: false
        });
        break;
      case "5cfe71b627ef3e0844de5cf8":
        this.setState({
          photography: false,
          bridal: false,
          videography: false,
          catering: true
        });
        break;
      default:
        this.setState({
          photography: false,
          bridal: false,
          videography: false,
          catering: false
        });
        break;
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeAvatar = e => {
    // this.setState({ [e.target.name]: e.target.files[0] });
    // console.log(e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      category: this.state.category,
      description: this.state.description,
      instagram: this.state.instagram,
      website: this.state.website,
      // password: this.state.password,
      name: this.state.name,
      artist: this.state.artist,
      berkat: this.state.berkat,
      cakes: this.state.cakes,
      stylist: this.state.stylist,
      makeup: this.state.makeup,
      bridal: this.state.bridal,
      outfits14: this.state.outfits14,
      outfits17: this.state.outfits17,
      outfits2: this.state.outfits2,
      outfits3: this.state.outfits3,
      outfits4: this.state.outfits4,
      photography: this.state.photography,
      event4: this.state.event4,
      event8: this.state.event8,
      eventout10: this.state.eventout10,
      preeventout: this.state.preeventout,
      videography: this.state.videography,
      event4video: this.state.event4video,
      event8video: this.state.event8video,
      eventout10video: this.state.eventout10video,
      preeventoutvideo: this.state.preeventoutvideo,
      catering: this.state.catering,
      fcatering: this.state.fcatering,
      fwcatering: this.state.fwcatering
    };

    if (
      this.state.file !== "" &&
      this.state.file !== undefined &&
      this.state.file !== null
    ) {
      let formData = new FormData();
      formData.append("file", this.state.file);
      this.props.updateVendorMain(data, formData);
    } else {
      this.props.updateVendorMain(data, "");
    }
  };

  render() {
    const { errors } = this.state;
    // console.log(this.state);
    const catering = (
      <div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="fcatering"
              id="fcatering"
              className="form-control"
              onChange={this.onChange}
              value={this.state.fcatering}
            >
              <option value="">Full Deco + Catering</option>
              <option value="11000 - 15000">11000 - 15000</option>
              <option value="15000 - 20000">15000 - 20000</option>
              <option value="20000 - ABOVE">20000 - ABOVE</option>
            </select>
            {errors.fcatering && (
              <div className="error" style={{ color: "red" }}>
                {errors.fcatering}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="fwcatering"
              id="fwcatering"
              className="form-control"
              onChange={this.onChange}
              value={this.state.fwcatering}
            >
              <option value="">Full Deco w/o Catering</option>
              <option value="4500 - 9000">4500 - 9000</option>
              <option value="10000 - 14000">10000 - 14000</option>
              <option value="15000 - ABOVE">15000 - ABOVE</option>
            </select>
            {errors.fwcatering && (
              <div className="error" style={{ color: "red" }}>
                {errors.fwcatering}
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const videography = (
      <div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="event4video"
              id="event4video"
              className="form-control"
              onChange={this.onChange}
              value={this.state.event4video}
            >
              <option value="">Event 4HRS</option>
              <option value="700 - 1200">700 - 1200</option>
              <option value="1200 - 1600">1200 - 1600</option>
            </select>
            {errors.event4video && (
              <div className="error" style={{ color: "red" }}>
                {errors.event4video}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="event8video"
              id="event8video"
              className="form-control"
              onChange={this.onChange}
              value={this.state.event8video}
            >
              <option value="">Event 8HRS</option>
              <option value="1600 - 2000">1600 - 2000</option>
              <option value="2000 - ABOVE">2000 - ABOVE</option>
            </select>
            {errors.event8video && (
              <div className="error" style={{ color: "red" }}>
                {errors.event8video}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="eventout10video"
              id="eventout10video"
              className="form-control"
              onChange={this.onChange}
              value={this.state.eventout10video}
            >
              <option value="">Event only + outdoor 10hrs </option>
              <option value="2000 - 2500">1600 - 1800</option>
              <option value="2500 - ABOVE">2500 - ABOVE</option>
            </select>
            {errors.eventout10video && (
              <div className="error" style={{ color: "red" }}>
                {errors.eventout10video}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="preeventoutvideo"
              id="preeventoutvideo"
              className="form-control"
              onChange={this.onChange}
              value={this.state.preeventoutvideo}
            >
              <option value="">Pre wed + Event + Outdoor</option>
              <option value="2500 - 3000">2500 - 3000</option>
              <option value="3000 - ABOVE">3000 - ABOVE</option>
            </select>
            {errors.preeventoutvideo && (
              <div className="error" style={{ color: "red" }}>
                {errors.preeventoutvideo}
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const photography = (
      <div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="event4"
              id="event4"
              className="form-control"
              onChange={this.onChange}
              value={this.state.event4}
            >
              <option value="">Event 4HRS</option>
              <option value="400 - 700">400 - 700</option>
              <option value="700 - 1000">700 - 1000</option>
              <option value="1000 - 1200">1000 - 1200</option>
            </select>
            {errors.event4 && (
              <div className="error" style={{ color: "red" }}>
                {errors.event4}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="event8"
              id="event8"
              className="form-control"
              onChange={this.onChange}
              value={this.state.event8}
            >
              <option value="">Event 8HRS</option>
              <option value="1300 - 1600">1300 - 1600</option>
              <option value="1600 - 2000">1600 - 2000</option>
              <option value="2000 - ABOVE">2000 - ABOVE</option>
            </select>
            {errors.event8 && (
              <div className="error" style={{ color: "red" }}>
                {errors.event8}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="eventout10"
              id="eventout10"
              className="form-control"
              onChange={this.onChange}
              value={this.state.eventout10}
            >
              <option value="">Event only + outdoor 10hrs </option>
              <option value="1600 - 1800">1600 - 1800</option>
              <option value="1800 - 2000">1800 - 2000</option>
              <option value="2000 - ABOVE">2000 - ABOVE</option>
            </select>
            {errors.eventout10 && (
              <div className="error" style={{ color: "red" }}>
                {errors.eventout10}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="preeventout"
              id="preeventout"
              className="form-control"
              onChange={this.onChange}
              value={this.state.preeventout}
            >
              <option value="">Pre wed + Event + Outdoor</option>
              <option value="2000 - 2400">2000 - 2400</option>
              <option value="2400 - 2600">2400 - 2600</option>
              <option value="2600 - ABOVE">2600 - ABOVE</option>
            </select>
            {errors.preeventout && (
              <div className="error" style={{ color: "red" }}>
                {errors.preeventout}
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const bridal = (
      <div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="outfits14"
              id="outfits14"
              className="form-control"
              onChange={this.onChange}
              value={this.state.outfits14}
            >
              <option value="">1 OUTFIT 4HRS</option>
              <option value="600 - 990">600 - 990</option>
              <option value="990 - 1200">990 - 1200</option>
            </select>
            {errors.outfits14 && (
              <div className="error" style={{ color: "red" }}>
                {errors.outfits14}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="outfits17"
              id="outfits17"
              className="form-control"
              onChange={this.onChange}
              value={this.state.outfits17}
            >
              <option value="">1 OUTFIT 7HRS</option>
              <option value="1600 - 1900">1600 - 1900</option>
              <option value="2100 - 2600">2100 - 2600</option>
            </select>
            {errors.outfits17 && (
              <div className="error" style={{ color: "red" }}>
                {errors.outfits17}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="outfits2"
              id="outfits2"
              className="form-control"
              onChange={this.onChange}
              value={this.state.outfits2}
            >
              <option value="">2 OUTFIT</option>
              <option value="2300 - 2600">2300 - 2600</option>
              <option value="2500 - 2900">2500 - 2900</option>
            </select>
            {errors.outfits2 && (
              <div className="error" style={{ color: "red" }}>
                {errors.outfits2}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="outfits3"
              id="outfits3"
              className="form-control"
              onChange={this.onChange}
              value={this.state.outfits3}
            >
              <option value="">3 OUTFIT</option>
              <option value="2500 - 2900">2500 - 2900</option>
              <option value="2900 - 3500">2900 - 3500</option>
            </select>
            {errors.outfits3 && (
              <div className="error" style={{ color: "red" }}>
                {errors.outfits3}
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <select
              name="outfits4"
              id="outfits4"
              className="form-control"
              onChange={this.onChange}
              value={this.state.outfits4}
            >
              <option value="">4 OUTFIT</option>
              <option value="3300 - 3500">3300 - 3500</option>
              <option value="3500 - ABOVE">3500 - ABOVE</option>
            </select>
            {errors.outfits4 && (
              <div className="error" style={{ color: "red" }}>
                {errors.outfits4}
              </div>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <section
        id="vendor2"
        className="gallery vendorpanel"
        style={{ marginTop: "50px", textAlign: "left" }}
      >
        <div className="container-fluid">
          <div className="row">
            <InnerNav />
            <div className="col-md-10 right-content">
              <form onSubmit={this.onSubmit}>
                <div className="container-fluid h-100">
                  <div className="row justify-content-center h-100">
                    <div className="col-md-12" id="contact">
                      <div className="contact-white">
                        <h3 className="text-uppercase text-center">Details</h3>
                        <div style={{ padding: "10px 10vw" }}>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Company Name"
                                value={this.state.name}
                                onChange={this.onChange}
                              />
                              {errors.name && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.name}
                                </div>
                              )}
                            </div>
                            {/* <div className="form-group col-md-12">
                              <input
                                type="email"
                                className="form-control"
                                id="Email"
                                name="email"
                                readOnly
                                disabled
                                placeholder="Email address"
                                value={this.state.email}
                                onChange={this.onChange}
                              />
                              {errors.email && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.email}
                                </div>
                              )}
                            </div> */}
                          </div>
                          {/* <div className="form-row">
                            <div className="form-group  col-md-12">
                              <input
                                type="password"
                                className="form-control"
                                id="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                placeholder="Change Password"
                              />
                              {errors.password && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.password}
                                </div>
                              )}
                            </div>
                          </div> */}
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <select
                                className="form-control"
                                name="category"
                                value={this.state.category}
                                onChange={this.handleCategoryOnChange}
                              >
                                <option value="">Select Category</option>
                                {this.state.categories &&
                                  this.state.categories.map((item, index) => {
                                    return (
                                      <option value={item._id} key={index}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                              </select>
                              {errors.category && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.category}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="file"
                                className="form-control"
                                onChange={this.onChangeAvatar}
                                id="file"
                                name="file"
                                placeholder="Profile Picture"
                              />
                              <p style={{ padding: "0px !important" }}>
                                Only select if you need to change the logo...
                              </p>
                              {errors.file && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.file}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-md-12">
                              <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="4"
                                placeholder="Company Description"
                                value={this.state.description}
                                onChange={this.onChange}
                              />
                              {errors.description && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.description}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* <div className="form-row">
                          <div className="form-group col-md-12">
                            <input
                              type="file"
                              name="file"
                              id="file"
                              className="inputfile"
                            />
                            <label className="file text-left" for="file">
                              Upload Picture
                            </label>
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              type="file"
                              name="file"
                              id="file"
                              className="inputfile"
                            />
                            <label className="file" for="file">
                              Upload Brouchers
                            </label>
                          </div>
                        </div> */}
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <input
                                type="url"
                                className="form-control"
                                id="Website"
                                name="website"
                                placeholder="Website link"
                                value={this.state.website}
                                onChange={this.onChange}
                              />
                              {errors.website && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.website}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="url"
                                className="form-control"
                                id="Instagram"
                                name="instagram"
                                placeholder="Instagram link"
                                value={this.state.instagram}
                                onChange={this.onChange}
                              />
                              {errors.instagram && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.instagram}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <select
                                name="berkat"
                                id="berkat"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.berkat}
                              >
                                <option value="">Berkat / Door Gifts</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                              </select>
                              {errors.berkat && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.berkat}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-md-6">
                              <select
                                name="heena"
                                id="heena"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.heena}
                              >
                                <option value="">Heena</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                              </select>
                              {errors.heena && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.heena}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <select
                                name="cakes"
                                id="cakes"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.cakes}
                              >
                                <option value="">Weeding Cakes</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                              </select>
                              {errors.cakes && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.cakes}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-md-6">
                              <select
                                name="stylist"
                                id="stylist"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.stylist}
                              >
                                <option value="">Groom Stylist</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                              </select>
                              {errors.stylist && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.stylist}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <select
                                name="makeup"
                                id="stylist"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.makeup}
                              >
                                <option value="">Makeup Artists</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                              </select>
                              {errors.makeup && (
                                <div className="error" style={{ color: "red" }}>
                                  {errors.makeup}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="contact-white price">
                        {(this.state.bridal ||
                          this.state.photography ||
                          this.state.videography ||
                          this.state.catering) && (
                            <h3 className="text-uppercase text-center">
                              Price List
                          </h3>
                          )}
                        <div style={{ padding: "10px 10vw" }}>
                          {this.state.bridal && bridal}
                          {this.state.videography && videography}
                          {this.state.photography && photography}
                          {this.state.catering && catering}
                          <div className="form-group text-center">
                            <input
                              type="submit"
                              value="Submit"
                              className="btn btn-light mysubmit savebtn"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Profile.propTypes = {
  updateVendorMain: PropTypes.func.isRequired,
  getByUserID: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  category: state.category,
  vendor: state.vendor
});

export default connect(
  mapStateToProps,
  { getCategories, updateVendorMain, getByUserID }
)(Profile);
