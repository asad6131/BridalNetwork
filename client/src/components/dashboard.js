import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { surveySubmit } from "../actions/surveyActions";
import InnerNav from "./innerNav";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      venue: "",
      date: "",
      duration: "",
      pax: "",
      hours: "",
      budget: "",
      artist: "",
      berkat: "",
      cakes: "",
      stylist: "",
      comments: "",
      heena: "",

      outfits: "",
      outfits_budget: "",
      outfits14: "block",
      outfits17: "none",
      outfits2: "none",
      outfits3: "none",
      outfits42: "none",
      videography: "",
      videography_budget: "",
      Video_1600_2000: "none",
      Video_2000_above: "none",
      Video_700_1200: "none",
      Video_2000_2500: "none",
      Video_2500_above: "none",
      Video_3000_above: "none",
      Video_2500_3000: "none",
      photography: "",
      photography_budget: "",
      Photo_400_700: "block",
      Photo_700_1000: "block",
      Photo_1000_1200: "block",
      Photo_1300_1600: "none",
      Photo_1600_2000: "none",
      Photo_2000_above: "none",
      Photo_700_1200: "none",
      Photo_2500_above: "none",
      Photo_2000_2500: "none",
      deco: "",
      deco_budget: "",
      Deco_11000_15000: "block",
      Deco_16000_20000: "block",
      Deco_21000_above: "block",
      Deco_4500_9000: "none",
      Deco_10000_14000: "none",
      Deco_15000_above: "none"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    if (this.props.auth.user.user_type == "1") {
      this.props.history.push("/admin");
    }
  }

  filterOutfits(e) {
    e.preventDefault();
    this.setState({ outfits: e.target.value, outfits_budget: "" });
    switch (e.target.value) {
      case "1 OUTFIT 4HRS":
        this.setState({
          outfits_budget: "",
          outfits14: "block",
          outfits17: "none",
          outfits2: "none",
          outfits3: "none",
          outfits4: "none"
        });
        break;
      case "1 OUTFIT 7HRS":
        this.setState({
          outfits_budget: "",
          outfits14: "none",
          outfits17: "block",
          outfits2: "none",
          outfits3: "none",
          outfits4: "none"
        });
        break;
      case "2 OUTFIT":
        this.setState({
          outfits_budget: "",
          outfits14: "none",
          outfits17: "none",
          outfits2: "block",
          outfits3: "none",
          outfits4: "none"
        });
        break;
      case "3 OUTFIT":
        this.setState({
          outfits_budget: "",
          outfits14: "none",
          outfits17: "none",
          outfits2: "none",
          outfits3: "block",
          outfits4: "none"
        });
        break;
      case "4 OUTFIT":
        this.setState({
          outfits_budget: "",
          outfits14: "none",
          outfits17: "none",
          outfits2: "none",
          outfits3: "none",
          outfits4: "block"
        });
        break;
      default:
        this.setState({
          outfits_budget: "",
          outfits14: "block",
          outfits17: "none",
          outfits2: "none",
          outfits3: "none",
          outfits4: "none"
        });
    }
  }

  filterVideoGraphy(e) {
    e.preventDefault();
    this.setState({ videography: e.target.value, videography_budget: "" });
    switch (e.target.value) {
      case "Event 8HRS":
        this.setState({
          Video8: "block",
          Video4: "none",
          Video10: "none",
          Videopw: "none",
        });
        break;
      case "Event 4HRS":
        this.setState({
          Video8: "none",
          Video4: "block",
          Video10: "none",
          Videopw: "none",
        });
        break;
      case "Event only + outdoor 10hrs":
        this.setState({
          Video8: "none",
          Video4: "none",
          Video10: "block",
          Videopw: "none",
        });
        break;
      case "Pre wed + Event + Outdoor":
        this.setState({
          Video8: "none",
          Video4: "none",
          Video10: "none",
          Videopw: "block",
        });
        break;
      default:
        this.setState({
          Video8: "block",
          Video4: "none",
          Video10: "none",
          Videopw: "none",
        });
    }
  }

  filterPhotoGraphy(e) {
    e.preventDefault();
    this.setState({ photography: e.target.value, photography_budget: "" });
    switch (e.target.value) {
      case "Event 4HRS":
        this.setState({
          Photo_400_700: "block",
          Photo_700_1000: "block",
          Photo_1000_1200: "block",
          Photo_1300_1600: "none",
          Photo_1600_2000: "none",
          Photo_2000_above: "none",
          Photo_1600_1800: "none",
          Photo_1800_2000: "none",
          Photo_2500_above: "none",
          Photo_2400_2600: "none",
          Photo_2600_above: "none"
        });
        break;
      case "Event 8HRS":
        this.setState({
          Photo_400_700: "none",
          Photo_700_1000: "none",
          Photo_1000_1200: "none",
          Photo_1300_1600: "block",
          Photo_1600_2000: "block",
          Photo_1600_1800: "none",
          Photo_1800_2000: "none",
          Photo_2000_above: "block",
          Photo_2000_2400: "none",
          Photo_2400_2600: "none",
          Photo_2600_above: "none"
        });
        break;
      case "Event only + outdoor 10hrs":
        this.setState({
          Photo_400_700: "none",
          Photo_700_1000: "none",
          Photo_1000_1200: "none",
          Photo_1300_1600: "none",
          Photo_1600_2000: "none",
          Photo_1600_1800: "block",
          Photo_1800_2000: "block",
          Photo_2000_above: "block",
          Photo_2000_2400: "none",
          Photo_2400_2600: "none",
          Photo_2600_above: "none"
        });
        break;
      case "Pre wed + Event + Outdoor":
        this.setState({
          Photo_400_700: "none",
          Photo_700_1000: "none",
          Photo_1000_1200: "none",
          Photo_1300_1600: "none",
          Photo_1600_2000: "none",
          Photo_1600_1800: "none",
          Photo_1800_2000: "none",
          Photo_2000_above: "none",
          Photo_2000_2400: "block",
          Photo_2400_2600: "block",
          Photo_2600_above: "block"
        });
        break;
      default:
        this.setState({
          Photo_400_700: "block",
          Photo_700_1000: "block",
          Photo_1000_1200: "block",
          Photo_1300_1600: "none",
          Photo_1600_2000: "none",
          Photo_2000_above: "none",
          Photo_1600_1800: "none",
          Photo_1800_2000: "none",
          Photo_2500_above: "none",
          Photo_2400_2600: "none",
          Photo_2600_above: "none"
        });
    }
  }

  filterDeco(e) {
    e.preventDefault();
    this.setState({ deco: e.target.value, deco_budget: "" });
    switch (e.target.value) {
      case "Full Deco + Catering":
        this.setState({
          Deco_11000_15000: "block",
          Deco_16000_20000: "block",
          Deco_21000_above: "block",
          Deco_4500_9000: "none",
          Deco_10000_14000: "none",
          Deco_15000_above: "none"
        });
        break;
      case "Full Deco w/o Catering":
        this.setState({
          Deco_11000_15000: "none",
          Deco_16000_20000: "none",
          Deco_21000_above: "none",
          Deco_4500_9000: "block",
          Deco_10000_14000: "block",
          Deco_15000_above: "block"
        });
        break;
      default:
        this.setState({
          Deco_11000_15000: "block",
          Deco_16000_20000: "block",
          Deco_21000_above: "block",
          Deco_4500_9000: "none",
          Deco_10000_14000: "none",
          Deco_15000_above: "none"
        });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      phone: this.state.phone,
      venue: this.state.venue,
      date: this.state.date,
      duration: this.state.duration,
      pax: this.state.pax,
      hours: this.state.hours,
      budget: this.state.budget,
      artist: this.state.artist,
      berkat: this.state.berkat,
      cakes: this.state.cakes,
      stylist: this.state.stylist,
      heena: this.state.heena,
      outfits: this.state.outfits,
      outfits_budget: this.state.outfits_budget,
      photography: this.state.photography,
      photography_budget: this.state.photography_budget,
      videography: this.state.videography,
      videography_budget: this.state.videography_budget,
      deco: this.state.deco,
      deco_budget: this.state.deco_budget,
      comments: this.state.comments
    };
    // console.log(data);
    this.props.surveySubmit(data);
  }

  render() {
    return (

      <div>
        <section id="main">
          <div className="container">
            <div className="white-bg" style={{ padding: "20px", margin: "50px auto 0px" }}>
              <h3>Plan Your Wedding</h3>

              <form onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={this.state.date}
                      placeholder="Your Wedding Date"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={this.state.phone}
                    placeholder="Contact No. or Email Address"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      name="venue"
                      id="venue"
                      className="form-control"
                      value={this.state.venue}
                      required
                      onChange={this.onChange}
                    >
                      <option value="">Select Venue</option>
                      <option value="Multi Purpose Hall (HDB)">
                        Multi Purpose Hall (HDB)
                          </option>
                      <option value="Multi Purpose Hall (CC)">
                        Multi Purpose Hall (CC)
                          </option>
                      <option value="Ballroom">Ballroom</option>
                      <option value="HDB">HDB</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6" style={{ display: 'none' }}>
                    <select
                      name="duration"
                      id="duration"
                      className="form-control"
                      value={this.state.duration}
                      onChange={this.onChange}
                    >
                      <option value="">Duration of Weeding</option>
                      <option value="1 Day Event">1 Day Event</option>
                      <option value="2 Day Event">2 Day Event</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="pax"
                      id="pax"
                      className="form-control"
                      value={this.state.pax}
                      required
                      onChange={this.onChange}
                    >
                      <option value="">No. of Pax</option>
                      <option value="300 Pax">300 Pax</option>
                      <option value="500 Pax">500 Pax</option>
                      <option value="800 Pax">800 Pax</option>
                      <option value="1000 Pax">1000 Pax</option>
                    </select>
                  </div>
                </div>
                <div className="form-row" style={{ display: 'none' }}>
                  <div className="form-group col-md-6">
                    <select
                      name="hours"
                      id="hours"
                      className="form-control"
                      value={this.state.hours}
                      onChange={this.onChange}
                    >
                      <option value="">No. of Hours</option>
                      <option value="5 Hours">5 Hours</option>
                      <option value="8 hours">8 hours</option>
                      <option value="10 hours">10 hours</option>
                      <option value="12 Hours">12 Hours</option>
                    </select>
                  </div>
                </div>
                <div className="form-row" style={{ display: 'none' }}>
                  <div className="form-group col-md-6">
                    <select
                      name="budget"
                      id="budget"
                      className="form-control"
                      value={this.state.budget}
                      onChange={this.onChange}
                    >
                      <option value="">Overall Budget</option>
                      <option value="1000">$1000</option>
                      <option value="3000">$3000</option>
                      <option value="5000">$5000</option>
                      <option value="12000">$12000</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="artist"
                      id="artist"
                      className="form-control"
                      value={this.state.artist}
                      onChange={this.onChange}
                    >
                      <option value="">Spare Makeup Artist</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      name="outfits"
                      id="outfits"
                      className="form-control"
                      required
                      onChange={this.filterOutfits.bind(this)}
                    >
                      <option value="">No. of Outfits</option>
                      <option value="1 OUTFIT 4HRS">
                        1 OUTFIT 4HRS
                          </option>
                      <option value="1 OUTFIT 7HRS">
                        1 OUTFIT 7HRS
                          </option>
                      <option value="2 OUTFIT">2 OUTFIT</option>
                      <option value="3 OUTFIT">3 OUTFIT</option>
                      <option value="4 OUTFIT">
                        4 OUTFIT
                          </option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="outfits_budget"
                      id="outfits_budget"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    >
                      <option value="">Outfits Budget</option>
                      <option
                        value="600 - 990"
                        style={{ display: this.state.outfits14 }}
                      >
                        $600 - $990
                          </option>
                      <option
                        value="990 - 1200"
                        style={{ display: this.state.outfits14 }}
                      >
                        $990 - $1200
                          </option>
                      <option
                        value="1600 - 1900"
                        style={{ display: this.state.outfits17 }}
                      >
                        $1600 - $1900
                          </option>
                      <option
                        value="2100 - 2600"
                        style={{ display: this.state.outfits17 }}
                      >
                        $2100 - $2600
                          </option>
                      <option
                        value="2300 - 2600"
                        style={{ display: this.state.outfits2 }}
                      >
                        $2300 - $2600
                          </option>
                      <option
                        value="2500 - 2900"
                        style={{ display: this.state.outfits2 }}
                      >
                        $2500 - $2900
                          </option>
                      <option
                        value="2500 - 2900"
                        style={{ display: this.state.outfits3 }}
                      >
                        $2500 - $2900
                          </option>
                      <option
                        value="2900 - 3500"
                        style={{ display: this.state.outfits3 }}
                      >
                        $2900 - $3500
                          </option>
                      <option
                        value="3300 - 3500"
                        style={{ display: this.state.outfits4 }}
                      >
                        $3300 - $3500
                          </option>
                      <option
                        value="3500 - ABOVE"
                        style={{ display: this.state.outfits4 }}
                      >
                        $3500 - ABOVE
                          </option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      name="deco"
                      id="deco"
                      className="form-control"
                      required
                      onChange={this.filterDeco.bind(this)}
                    >
                      <option value="">Deco & Catering</option>
                      <option value="Full Deco + Catering">
                        Full Deco + Catering
                          </option>
                      <option value="Full Deco w/o Catering">
                        Full Deco w/o Catering
                          </option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="deco_budget"
                      id="deco_budget"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    >
                      <option value="">Deco Budget</option>
                      <option
                        value="11000 - 15000"
                        style={{ display: this.state.Deco_11000_15000 }}
                      >
                        $11000 - $15000
                          </option>
                      <option
                        value="15000 - 20000"
                        style={{ display: this.state.Deco_16000_20000 }}
                      >
                        $15000 - $20000
                          </option>
                      <option
                        value="20000 - ABOVE"
                        style={{ display: this.state.Deco_21000_above }}
                      >
                        $20000 - ABOVE
                          </option>
                      <option
                        value="4500 - 9000"
                        style={{ display: this.state.Deco_4500_9000 }}
                      >
                        $4500 - $9000
                          </option>
                      <option
                        value="10000 - 14000"
                        style={{ display: this.state.Deco_10000_14000 }}
                      >
                        $10000 - $14000
                          </option>
                      <option
                        value="15000 - ABOVE"
                        style={{ display: this.state.Deco_15000_above }}
                      >
                        $15000 - ABOVE
                          </option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      name="photography"
                      id="photography"
                      className="form-control"
                      required
                      onChange={this.filterPhotoGraphy.bind(this)}
                    >
                      <option value="">Photography</option>
                      <option value="Event 4HRS">
                        Event 4HRS
                          </option>
                      <option value="Event 8HRS">
                        Event 8HRS
                          </option>
                      <option value="Event only + outdoor 10hrs">
                        Event only + outdoor 10hrs
                          </option>
                      <option value="Pre wed + Event + Outdoor">
                        Pre wed + Event + Outdoor
                          </option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="photography_budget"
                      id="photography_budget"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    >
                      <option value="">Photography Budget</option>
                      <option value="400 - 700"
                        style={{ display: this.state.Photo_400_700 }}
                      >$400 - $700</option>
                      <option value="700 - 1000"
                        style={{ display: this.state.Photo_700_1000 }}
                      >$700 - $1000</option>
                      <option value="1000 - 1200"
                        style={{ display: this.state.Photo_1000_1200 }}
                      >$1000 - $1200</option>
                      <option
                        value="1300 - 1600"
                        style={{ display: this.state.Photo_1300_1600 }}
                      >
                        $1300 - $1600
                          </option>
                      <option
                        value="1600 - 2000"
                        style={{ display: this.state.Photo_1600_2000 }}
                      >
                        $1600 - $2000
                          </option>

                      <option
                        value="1600 - 1800"
                        style={{ display: this.state.Photo_1600_1800 }}
                      >
                        $1600 - $1800
                          </option>
                      <option
                        value="1800 - 2000"
                        style={{ display: this.state.Photo_1800_2000 }}
                      >
                        $1800 - $2000
                          </option>
                      <option
                        value="2000 - 2400"
                        style={{ display: this.state.Photo_2000_2400 }}
                      >
                        $2000 - $2400
                          </option>
                      <option
                        value="2400 - 2600"
                        style={{ display: this.state.Photo_2400_2600 }}
                      >
                        $2400 - $2600
                          </option>
                      <option
                        value="2000 - ABOVE"
                        style={{ display: this.state.Photo_2000_above }}
                      >
                        $2000 - ABOVE
                          </option>
                      <option
                        value="2600 - ABOVE"
                        style={{ display: this.state.Photo_2600_above }}
                      >
                        $2600 - ABOVE
                          </option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      name="videography"
                      id="videography"
                      className="form-control"
                      required
                      onChange={this.filterVideoGraphy.bind(this)}
                      value={this.state.videography}
                    >
                      <option value="">Videography</option>
                      <option value="Event 4HRS">
                        Event 4HRS
                          </option>
                      <option value="Event 8HRS">
                        Event 8HRS
                          </option>
                      <option value="Event only + outdoor 10hrs">
                        Event only + outdoor 10hrs
                          </option>
                      <option value="Pre wed + Event + Outdoor">
                        Pre wed + Event + Outdoor
                          </option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="videography_budget"
                      id="videography_budget"
                      className="form-control"
                      value={this.state.videography_budget}
                      required
                      onChange={this.onChange}
                    >
                      <option value="">Videography Budget</option>
                      <option
                        value="700 - 1200"
                        style={{ display: this.state.Video4 }}
                      >
                        $700 - $1200
                          </option>
                      <option
                        value="1200 - 1600"
                        style={{ display: this.state.Video4 }}
                      >
                        $1200 - $1600
                          </option>
                      <option
                        value="1600 - 2000"
                        style={{ display: this.state.Video8 }}
                      >
                        $1600 - $2000
                          </option>
                      <option
                        value="2000 - ABOVE"
                        style={{ display: this.state.Video8 }}
                      >
                        $2000 - ABOVE
                          </option>
                      <option
                        value="16000 - 1800"
                        style={{ display: this.state.Video10 }}
                      >
                        $1600 - $1800
                          </option>
                      <option
                        value="2500 - ABOVE"
                        style={{ display: this.state.Video10 }}
                      >
                        $2500 - ABOVE
                          </option>
                      <option
                        value="2500 - 3000"
                        style={{ display: this.state.Videopw }}
                      >
                        $2500 - $3000
                          </option>
                      <option
                        value="3000 - ABOVE"
                        style={{ display: this.state.Videopw }}
                      >
                        $3000 - ABOVE
                          </option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      name="berkat"
                      id="berkat"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      value={this.state.berkat}
                    >
                      <option value="">Berkat / Door Gifts</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="heena"
                      id="heena"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      value={this.state.heena}
                    >
                      <option value="">Heena</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      name="cakes"
                      id="cakes"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      value={this.state.cakes}
                    >
                      <option value="">Weeding Cakes</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="stylist"
                      id="stylist"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      value={this.state.stylist}
                    >
                      <option value="">Groom Stylist</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      name="artist"
                      id="artist"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      value={this.state.artist}
                    >
                      <option value="">Makeup</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="comments"
                    name="comments"
                    rows="3"
                    onChange={this.onChange}
                    value={this.state.comments}
                    placeholder="Write your special request or comments here.."
                  />
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-light btn-profile-back mysubmit"
                  />
                </div>
              </form>

            </div>
          </div>
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
  surveySubmit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { surveySubmit }
)(Dashboard);
