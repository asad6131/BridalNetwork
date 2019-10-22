import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { surveySubmit } from "../actions/surveyActions";
import InnerNav from "./innerNav";
import { MDBSelect, MDBSelectOptions, MDBSelectOption, MDBSelectInput } from "mdbreact";

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
            <div className="white-bg" style={{ padding: "15px", margin: "50px auto 0px" }}>
              <h3 style={{ marginBottom: "30px" }}>Plan Your Wedding</h3>

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

                <div className="form-row" >
                  <div className="form-group col-md-12">
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
                </div>

                <div className="form-row" style={{ marginTop: "-20px" }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Select Venue"
                      name="venue"
                      id="venue"
                      // className="form-control"
                      value={this.state.venue}
                      required
                      onChange={this.onChange}
                      color="dark"
                    >

                      <MDBSelectInput selected="Select Venue" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Select Venue</MDBSelectOption>
                        <MDBSelectOption value="Multi Purpose Hall (HDB)">
                          Multi Purpose Hall (HDB)
                        </MDBSelectOption>
                        <MDBSelectOption value="Multi Purpose Hall (CC)">
                          Multi Purpose Hall (CC)
                        </MDBSelectOption>
                        <MDBSelectOption value="Ballroom">Ballroom</MDBSelectOption>
                        <MDBSelectOption value="HDB">HDB</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  {/* </div> */}
                  {/* <div className="form-row" >
                    <div className="form-group col-md-6" style={{ display: 'none' }}>
                      <MDBSelect
                        name="duration"
                        id="duration"
                        value={this.state.duration}
                        onChange={this.onChange}
                        color="dark"
                      >
                        <MDBSelectInput selected="Duration of Wedding" />
                        <MDBSelectOptions>
                          <MDBSelectOption disabled>Duration of Wedding</MDBSelectOption>
                          <MDBSelectOption value="1 Day Event">1 Day Event</MDBSelectOption>
                          <MDBSelectOption value="2 Day Event">2 Day Event</MDBSelectOption>
                        </MDBSelectOptions>
                      </MDBSelect>
                    </div>
                  </div> */}
                  {/* <div className="form-row" style={{ marginTop: "-20px" }}> */}
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="No. of Pax"
                      name="pax"
                      id="pax"
                      value={this.state.pax}
                      required
                      onChange={this.onChange}
                      color="dark"
                    >
                      <MDBSelectInput selected="No. of Pax" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>No. of Pax</MDBSelectOption>
                        <MDBSelectOption value="300 Pax">300 Pax</MDBSelectOption>
                        <MDBSelectOption value="500 Pax">500 Pax</MDBSelectOption>
                        <MDBSelectOption value="800 Pax">800 Pax</MDBSelectOption>
                        <MDBSelectOption value="1000 Pax">1000 Pax</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                </div>
                <div className="form-row" style={{ display: 'none' }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="No.of Hours"
                      name="hours"
                      id="hours"
                      value={this.state.hours}
                      onChange={this.onChange}
                      color="dark"
                    >
                      <MDBSelectInput selected="No. of Hours" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>No. of Hours</MDBSelectOption>
                        <MDBSelectOption value="5 Hours">5 Hours</MDBSelectOption>
                        <MDBSelectOption value="8 hours">8 hours</MDBSelectOption>
                        <MDBSelectOption value="10 hours">10 hours</MDBSelectOption>
                        <MDBSelectOption value="12 Hours">12 Hours</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                </div>
                <div className="form-row" style={{ display: 'none', marginTop: "-20px" }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Overall Budget"
                      name="budget"
                      id="budget"
                      value={this.state.budget}
                      onChange={this.onChange}
                      color="dark"
                    >
                      <MDBSelectInput selected="Overall Budget" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Overall Budget</MDBSelectOption>
                        <MDBSelectOption value="1000">$1000</MDBSelectOption>
                        <MDBSelectOption value="3000">$3000</MDBSelectOption>
                        <MDBSelectOption value="5000">$5000</MDBSelectOption>
                        <MDBSelectOption value="12000">$12000</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Spare Makeup Artist"
                      name="artist"
                      id="artist"
                      value={this.state.artist}
                      onChange={this.onChange}
                      color="dark"
                    >
                      <MDBSelectInput selected="Spare Makeup Artist" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Spare Makeup Artist</MDBSelectOption>
                        <MDBSelectOption value="0">No</MDBSelectOption>
                        <MDBSelectOption value="1">Yes</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: "-20px" }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="No. of Outfits"
                      name="outfits"
                      id="outfits"
                      required
                      onChange={this.filterOutfits.bind(this)}
                      color="dark"
                    >
                      <MDBSelectInput selected="No. of Outfits" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>No. of Outfits</MDBSelectOption>
                        <MDBSelectOption value="1 OUTFIT 4HRS">
                          1 OUTFIT 4HRS
                          </MDBSelectOption>
                        <MDBSelectOption value="1 OUTFIT 7HRS">
                          1 OUTFIT 7HRS
                          </MDBSelectOption>
                        <MDBSelectOption value="2 OUTFIT">2 OUTFIT</MDBSelectOption>
                        <MDBSelectOption value="3 OUTFIT">3 OUTFIT</MDBSelectOption>
                        <MDBSelectOption value="4 OUTFIT">
                          4 OUTFIT
                          </MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Outfits Budget"
                      name="outfits_budget"
                      id="outfits_budget"
                      required
                      onChange={this.onChange}
                      color="dark"
                    >
                      <MDBSelectInput selected="Outfits Budget" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Outfits Budget</MDBSelectOption>
                        <MDBSelectOption
                          value="600 - 990"
                          style={{ display: this.state.outfits14 }}
                        >
                          $600 - $990
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="990 - 1200"
                          style={{ display: this.state.outfits14 }}
                        >
                          $990 - $1200
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="1600 - 1900"
                          style={{ display: this.state.outfits17 }}
                        >
                          $1600 - $1900
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2100 - 2600"
                          style={{ display: this.state.outfits17 }}
                        >
                          $2100 - $2600
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2300 - 2600"
                          style={{ display: this.state.outfits2 }}
                        >
                          $2300 - $2600
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2500 - 2900"
                          style={{ display: this.state.outfits2 }}
                        >
                          $2500 - $2900
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2500 - 2900"
                          style={{ display: this.state.outfits3 }}
                        >
                          $2500 - $2900
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2900 - 3500"
                          style={{ display: this.state.outfits3 }}
                        >
                          $2900 - $3500
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="3300 - 3500"
                          style={{ display: this.state.outfits4 }}
                        >
                          $3300 - $3500
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="3500 - ABOVE"
                          style={{ display: this.state.outfits4 }}
                        >
                          $3500 - ABOVE
                          </MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: "-20px" }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Deco & Catering"
                      name="deco"
                      id="deco"
                      required
                      onChange={this.filterDeco.bind(this)}
                      color="dark"
                    >
                      <MDBSelectInput selected="Deco & Catering" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Deco & Catering</MDBSelectOption>
                        <MDBSelectOption value="Full Deco + Catering">
                          Full Deco + Catering
                          </MDBSelectOption>
                        <MDBSelectOption value="Full Deco w/o Catering">
                          Full Deco w/o Catering
                          </MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Deco Budget"
                      name="deco_budget"
                      id="deco_budget"
                      required
                      onChange={this.onChange}
                      color="dark"
                    >
                      <MDBSelectInput selected="Deco Budget" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Deco Budget</MDBSelectOption>
                        <MDBSelectOption
                          value="11000 - 15000"
                          style={{ display: this.state.Deco_11000_15000 }}
                        >
                          $11000 - $15000
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="15000 - 20000"
                          style={{ display: this.state.Deco_16000_20000 }}
                        >
                          $15000 - $20000
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="20000 - ABOVE"
                          style={{ display: this.state.Deco_21000_above }}
                        >
                          $20000 - ABOVE
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="4500 - 9000"
                          style={{ display: this.state.Deco_4500_9000 }}
                        >
                          $4500 - $9000
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="10000 - 14000"
                          style={{ display: this.state.Deco_10000_14000 }}
                        >
                          $10000 - $14000
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="15000 - ABOVE"
                          style={{ display: this.state.Deco_15000_above }}
                        >
                          $15000 - ABOVE
                          </MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: "-20px" }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Photography"
                      name="photography"
                      id="photography"
                      required
                      onChange={this.filterPhotoGraphy.bind(this)}
                      color="dark"
                    >
                      <MDBSelectInput selected="Photography" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Photography</MDBSelectOption>
                        <MDBSelectOption value="Event 4HRS">
                          Event 4HRS
                          </MDBSelectOption>
                        <MDBSelectOption value="Event 8HRS">
                          Event 8HRS
                          </MDBSelectOption>
                        <MDBSelectOption value="Event only + outdoor 10hrs">
                          Event only + outdoor 10hrs
                          </MDBSelectOption>
                        <MDBSelectOption value="Pre wed + Event + Outdoor">
                          Pre wed + Event + Outdoor
                          </MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Photography Budget"
                      name="photography_budget"
                      id="photography_budget"
                      required
                      onChange={this.onChange}
                      color="dark"
                    >
                      <MDBSelectInput selected="Photography Budget" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Photography Budget</MDBSelectOption>
                        <MDBSelectOption value="400 - 700"
                          style={{ display: this.state.Photo_400_700 }}
                        >$400 - $700</MDBSelectOption>
                        <MDBSelectOption value="700 - 1000"
                          style={{ display: this.state.Photo_700_1000 }}
                        >$700 - $1000</MDBSelectOption>
                        <MDBSelectOption value="1000 - 1200"
                          style={{ display: this.state.Photo_1000_1200 }}
                        >$1000 - $1200</MDBSelectOption>
                        <MDBSelectOption
                          value="1300 - 1600"
                          style={{ display: this.state.Photo_1300_1600 }}
                        >
                          $1300 - $1600
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="1600 - 2000"
                          style={{ display: this.state.Photo_1600_2000 }}
                        >
                          $1600 - $2000
                          </MDBSelectOption>

                        <MDBSelectOption
                          value="1600 - 1800"
                          style={{ display: this.state.Photo_1600_1800 }}
                        >
                          $1600 - $1800
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="1800 - 2000"
                          style={{ display: this.state.Photo_1800_2000 }}
                        >
                          $1800 - $2000
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2000 - 2400"
                          style={{ display: this.state.Photo_2000_2400 }}
                        >
                          $2000 - $2400
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2400 - 2600"
                          style={{ display: this.state.Photo_2400_2600 }}
                        >
                          $2400 - $2600
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2000 - ABOVE"
                          style={{ display: this.state.Photo_2000_above }}
                        >
                          $2000 - ABOVE
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2600 - ABOVE"
                          style={{ display: this.state.Photo_2600_above }}
                        >
                          $2600 - ABOVE
                          </MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: "-20px" }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Videography"
                      name="videography"
                      id="videography"
                      required
                      onChange={this.filterVideoGraphy.bind(this)}
                      value={this.state.videography}
                      color="dark"
                    >
                      <MDBSelectInput selected="Videography" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Videography</MDBSelectOption>
                        <MDBSelectOption value="Event 4HRS">
                          Event 4HRS
                          </MDBSelectOption>
                        <MDBSelectOption value="Event 8HRS">
                          Event 8HRS
                          </MDBSelectOption>
                        <MDBSelectOption value="Event only + outdoor 10hrs">
                          Event only + outdoor 10hrs
                          </MDBSelectOption>
                        <MDBSelectOption value="Pre wed + Event + Outdoor">
                          Pre wed + Event + Outdoor
                          </MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Videography Budget"
                      name="videography_budget"
                      id="videography_budget"
                      value={this.state.videography_budget}
                      required
                      onChange={this.onChange}
                      color="dark"
                    >
                      <MDBSelectInput selected="Videography Budget" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Videography Budget</MDBSelectOption>
                        <MDBSelectOption
                          value="700 - 1200"
                          style={{ display: this.state.Video4 }}
                        >
                          $700 - $1200
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="1200 - 1600"
                          style={{ display: this.state.Video4 }}
                        >
                          $1200 - $1600
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="1600 - 2000"
                          style={{ display: this.state.Video8 }}
                        >
                          $1600 - $2000
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2000 - ABOVE"
                          style={{ display: this.state.Video8 }}
                        >
                          $2000 - ABOVE
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="16000 - 1800"
                          style={{ display: this.state.Video10 }}
                        >
                          $1600 - $1800
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2500 - ABOVE"
                          style={{ display: this.state.Video10 }}
                        >
                          $2500 - ABOVE
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="2500 - 3000"
                          style={{ display: this.state.Videopw }}
                        >
                          $2500 - $3000
                          </MDBSelectOption>
                        <MDBSelectOption
                          value="3000 - ABOVE"
                          style={{ display: this.state.Videopw }}
                        >
                          $3000 - ABOVE
                          </MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: "-20px" }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Berkat / Door Gifts"
                      name="berkat"
                      id="berkat"
                      required
                      onChange={this.onChange}
                      value={this.state.berkat}
                      color="dark"
                    >
                      <MDBSelectInput selected="Berkat / Door Gifts" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Berkat / Door Gifts</MDBSelectOption>
                        <MDBSelectOption value="0">No</MDBSelectOption>
                        <MDBSelectOption value="1">Yes</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Heena"
                      name="heena"
                      id="heena"
                      required
                      onChange={this.onChange}
                      value={this.state.heena}
                      color="dark"
                    >
                      <MDBSelectInput selected="Heena" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Heena</MDBSelectOption>
                        <MDBSelectOption value="0">No</MDBSelectOption>
                        <MDBSelectOption value="1">Yes</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: "-20px" }}>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Wedding Cakes"
                      name="cakes"
                      id="cakes"
                      required
                      onChange={this.onChange}
                      value={this.state.cakes}
                      color="dark"
                    >
                      <MDBSelectInput selected="Wedding Cakes" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Wedding Cakes</MDBSelectOption>
                        <MDBSelectOption value="0">No</MDBSelectOption>
                        <MDBSelectOption value="1">Yes</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  <div className="form-group col-md-6">
                    <MDBSelect
                      label="Groom Stylist"
                      name="stylist"
                      id="stylist"
                      required
                      onChange={this.onChange}
                      value={this.state.stylist}
                      color="dark"
                    >
                      <MDBSelectInput selected="Groom Stylist" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Groom Stylist</MDBSelectOption>
                        <MDBSelectOption value="0">No</MDBSelectOption>
                        <MDBSelectOption value="1">Yes</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
                  </div>
                  <div className="form-group col-md-6" style={{ marginTop: "-20px" }}>
                    <MDBSelect
                      label="Makeup"
                      name="artist"
                      id="artist"
                      required
                      onChange={this.onChange}
                      value={this.state.artist}
                      color="dark"
                    >
                      <MDBSelectInput selected="Makeup" />
                      <MDBSelectOptions>
                        <MDBSelectOption disabled>Makeup</MDBSelectOption>
                        <MDBSelectOption value="0">No</MDBSelectOption>
                        <MDBSelectOption value="1">Yes</MDBSelectOption>
                      </MDBSelectOptions>
                    </MDBSelect>
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
