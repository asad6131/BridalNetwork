import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Adminnav from "../nav.js";
import {
  getByVendorIDAdmin,
  uploadMultiSliderAdmin,
  deleteSlider2Admin,
  submitTagsAdmin
} from "../../../actions/admin/vendorActions";

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      vendor: {},
      errors: {},
      flag: true,
      files: [],
      sliders: [],
      slider_id: "",
      tags: "",
      id: "",
      file: null
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push("/");
    }
    // this.setState({ handle: this.props.match.params.handle });
    this.props.getByVendorIDAdmin(this.props.match.params.handle);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    if (nextProps.auth.user.user_type !== "1") {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.vendor) {
      this.setState({ vendor: nextProps.vendor.vendor });
      this.setState({ id: nextProps.vendor.vendor._id });
      this.setState({ sliders: nextProps.vendor.vendor.slider });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    var convertToArrayimage = Array.from(this.state.files);
    if (convertToArrayimage.length <= 10 && convertToArrayimage.length > 0) {
      this.props.uploadMultiSliderAdmin(this.props.match.params.handle, convertToArrayimage);
    } else {
      alert("You can choose min 1 and max 10 files");
      const fileInput = document.querySelector("#file");
      fileInput.value = "";
    }
  };

  onSubmittags(e) {
    e.preventDefault();
    this.props.submitTagsAdmin(this.state.tags, this.state.id, this.state.slider_id);
  }

  deleteIMG(id) {
    var r = window.confirm("Are you sure you want to delete this image!");
    if (r === true) {
      this.props.deleteSlider2Admin(id, this.state.id);
    }
  }

  handleUploadImage(e) {
    e.preventDefault();
    this.setState({
      files: e.target.files
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div id="contact" style={{ marginTop: "50px" }}>
          <div className="container">
            <Adminnav />
            <div className="row" style={{ minHeight: "450px" }}>
              <div className="col-md-12">
                <div id="contact" style={{ textAlign: "left" }}>
                  <div className="container">
                    <div className="row">
                      <div className="container">
                        <div
                          className="contact-white"
                          style={{ padding: "50px 48px", width: "100%" }}
                        >
                          <h3 className="text-uppercase text-center">
                            GALLERY
                            </h3>
                          <form
                            onSubmit={this.onSubmit}
                            style={{ marginBottom: "30px" }}
                          >
                            <div className="form-row">
                              <div className="form-group col-md-8">
                                <input
                                  type="file"
                                  name="file"
                                  id="file"
                                  style={{ width: "100%" }}
                                  onChange={this.handleUploadImage}
                                  multiple={true}
                                  accept="image/*"
                                  required
                                />
                              </div>
                              <div className="form-group col-md-4">
                                <input
                                  style={{ padding: "2px 0" }}
                                  type="submit"
                                  value="Submit"
                                  className="btn btn-light mysubmit"
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display:
                                  this.state.flag && this.props.progress < 1
                                    ? "none"
                                    : ""
                              }}
                            >
                              <p
                                style={{
                                  textAlign: "center",
                                  marginTop: 20,
                                  marginBottom: 20
                                }}
                              >
                                {this.props.progress > 100
                                  ? "Files Uploading...   " + 100
                                  : "Files Uploading...   " +
                                  Math.floor(this.props.progress)}
                                % Completed...{" "}
                              </p>
                            </div>
                            <div
                              className="progress"
                              style={{
                                width: "80%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                display:
                                  this.state.flag && this.props.progress < 1
                                    ? "none"
                                    : ""
                              }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${this.props.progress}%` }}
                              />
                            </div>
                          </form>
                          <div className="row">
                            {this.state.sliders &&
                              this.state.sliders.map((item, index) => {
                                let tags = item.tags
                                  ? item.tags.split(",")
                                  : [];
                                return (
                                  <div className="col-md-4" key={index}>
                                    <div className="gall">
                                      <img
                                        src={item.img}
                                        className="img-fluid"
                                        style={{ height: "auto" }}
                                      />
                                      <a
                                        data-toggle="modal"
                                        data-target="#tagModal"
                                        href="#"
                                        style={{
                                          marginBottom: "2px",
                                          marginTop: "2px",
                                          width: "100%",
                                          padding: "2px"
                                        }}
                                        className="btn btn-light mysubmit tagbtn"
                                        onClick={() => {
                                          this.setState({
                                            slider_id: item._id,
                                            tags: tags
                                          });
                                        }}
                                      >
                                        ADD TAGS
                                        </a>
                                      <button
                                        onClick={this.deleteIMG.bind(
                                          this,
                                          item._id
                                        )}
                                        style={{
                                          marginBottom: "2px",
                                          marginTop: "2px",
                                          width: "100%",
                                          padding: "2px"
                                        }}
                                        className="btn btn-light mysubmit tagbtn"
                                      >
                                        Delete
                                        </button>
                                      <br />
                                      <b>Tags:</b>{" "}
                                      {tags.map((tag, index) => {
                                        return (
                                          <span
                                            className="badge badge-success"
                                            key={index}
                                            style={{ marginRight: "5px" }}
                                          >
                                            {tag}
                                          </span>
                                        );
                                      })}
                                    </div>
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
          </div>
        </div>

        <div id="tagModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content text-left">
              <div className="modal-header">
                <h4 className="modal-title">Manage Tags</h4>
              </div>
              <form onSubmit={this.onSubmittags.bind(this)}>
                <div className="modal-body">
                  <div className="form-group">
                    <label for="tags">Tags:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tags"
                      name="tags"
                      onChange={this.onChange}
                      value={this.state.tags}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  deleteSlider2Admin: PropTypes.func.isRequired,
  submitTagsAdmin: PropTypes.func.isRequired,
  uploadMultiSliderAdmin: PropTypes.func.isRequired,
  getByVendorIDAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  vendor: state.vendor,
  progress: state.vendor.progress,
  uploadedImageLink: state.vendor.uploadedImageLink
});

export default connect(
  mapStateToProps,
  { getByVendorIDAdmin, uploadMultiSliderAdmin, deleteSlider2Admin, submitTagsAdmin }
)(Gallery);
