import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Adminnav from "../nav.js";
import {
  addVendor,
  handleUploadStorage
} from "../../../actions/admin/vendorActions";
import { getCategories } from "../../../actions/admin/categoryActions";

class Addvendors extends Component {
  constructor() {
    super();
    this.state = {
      handle: "",
      name: "",
      bio: "",
      website: "",
      instagram: "",
      phone: "",
      category: "",
      price: "",
      file: "",
      categories: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push("/");
    }
    this.props.getCategories();
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

    if (nextProps.category) {
      this.setState({ categories: nextProps.category.categories });
    }
  }

  onChangeAvatar(e) {
    e.preventDefault();
    // console.log(e.target);
    this.setState({ file: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", this.state.file);

    const userData = {
      handle: this.state.handle,
      // price: this.state.price,
      category: this.state.category,
      name: this.state.name,
      bio: this.state.bio,
      website: this.state.website,
      instagram: this.state.instagram,
      phone: this.state.phone
    };

    this.props.addVendor(formData, userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUploadImage(e) {
    var convertToArrayimage = Array.from(e.target.files);
    if (convertToArrayimage.length <= 10) {
      this.props.handleUploadStorage(convertToArrayimage);
    } else {
      alert("You can choose only 10 files");
      const fileInput = document.querySelector("#imageFiles");
      fileInput.value = "";
    }
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
                <div className="contact-white">
                  <h3 className="text-uppercase text-center">Add Vendor</h3>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <select
                        name="category"
                        id="category"
                        className="form-control"
                        value={this.state.category}
                        onChange={this.onChange}
                        style={{ border: "1px solid #707070" }}
                      >
                        <option value="">Select Category</option>
                        {this.state.categories.map((item, index) => {
                          return (
                            <option key={index} value={item._id}>
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
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.handle}
                        onChange={this.onChange}
                        id="handle"
                        name="handle"
                        placeholder="Vendor Username"
                      />
                      {errors.handle && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.handle}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChange}
                        id="name"
                        name="name"
                        placeholder="Vendor Name"
                      />
                      {errors.name && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control"
                        onChange={this.onChangeAvatar}
                        id="file"
                        name="file"
                        placeholder="Profile Picture"
                        required
                      />
                      {errors.file && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.file}
                        </div>
                      )}
                    </div>
                    {/* <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChange}
                        id="price"
                        name="price"
                        placeholder="Price"
                      />
                      {errors.price && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.price}
                        </div>
                      )}
                    </div> */}
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        value={this.state.bio}
                        onChange={this.onChange}
                        id="bio"
                        name="bio"
                        rows="3"
                        placeholder="Vendor Description"
                      />
                      {errors.bio && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.bio}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.website}
                        onChange={this.onChange}
                        id="website"
                        name="website"
                        placeholder="Vendor Website"
                      />
                      {errors.website && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.website}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        id="instagram"
                        name="instagram"
                        placeholder="Vendor Instagram"
                      />
                      {errors.instagram && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.instagram}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.phone}
                        onChange={this.onChange}
                        id="phone"
                        name="phone"
                        placeholder="Vendor Phone"
                      />
                      {errors.phone && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    {/* <div className="form-group">
                      <input
                        type="file"
                        id="imageFiles"
                        className="form-control"
                        onChange={this.handleUploadImage}
                        multiple={true}
                        accept="image/*"
                      />
                    </div> */}
                    {/* <div>
                      <p style={{ textAlign: "center", marginTop: 40 }}>
                        {this.props.progress > 100
                          ? 100
                          : Math.floor(this.props.progress)}
                        % Completed...{" "}
                      </p>
                    </div>
                    <div
                      className="progress"
                      style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: ` ${this.props.progress}%` }}
                      />
                    </div> */}

                    <div className="text-center">
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-light mysubmit"
                      />
                    </div>
                  </form>
                  <div>
                    <ul>
                      {this.props.uploadedImageLink.length !== 0
                        ? this.props.uploadedImageLink.map((v, i) => {
                          return (
                            <li key={i}>
                              <a href={v.imageLink}>{v.name}</a>
                            </li>
                          );
                        })
                        : null}
                    </ul>
                    {this.props.uploadedImageLink.length !== 0 && (
                      <p>Upload Finish</p>
                    )}
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

Addvendors.propTypes = {
  getCategories: PropTypes.func.isRequired,
  addVendor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    addVendor: (formData, userData) => dispatch(addVendor(formData, userData)),
    getCategories: () => dispatch(getCategories()),
    handleUploadStorage: imageArr => dispatch(handleUploadStorage(imageArr))
  };
};

const mapStateToProps = state => {
  // console.log(state.vendor, "/////");
  return {
    auth: state.auth,
    errors: state.errors,
    category: state.category,
    progress: state.vendor.progress,
    uploadedImageLink: state.vendor.uploadedImageLink
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Addvendors);
