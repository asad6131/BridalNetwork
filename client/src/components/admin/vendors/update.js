import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Adminnav from "../nav.js";
import {
  updateVendor,
  updateVendor2,
  getByHandleVendor
} from "../../../actions/admin/vendorActions";
import { getCategories } from "../../../actions/admin/categoryActions";

class Addvendors extends Component {
  constructor() {
    super();
    this.state = {
      handle: "",
      name: "",
      price: "",
      bio: "",
      website: "",
      instagram: "",
      phone: "",
      file: "",
      category: "",
      categories: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push("/");
    }
    this.setState({ handle: this.props.match.params.handle });
    this.props.getByHandleVendor(this.props.match.params.handle);
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

    if (nextProps.vendor) {
      const vendor = nextProps.vendor.vendor;
      // console.log(vendors, ' fetching data');
      const stateData = {
        handle: vendor.handle,
        price: vendor.price,
        category: vendor.category,
        name: vendor.name,
        bio: vendor.description ? vendor.description : "",
        website: vendor.website ? vendor.website : "",
        instagram: vendor.instagram ? vendor.instagram : "",
        phone: vendor.phone ? vendor.phone : ""
      };
      this.setState(stateData);
    }
  }

  onChangeAvatar(e) {
    e.preventDefault();
    // console.log(e.target);
    this.setState({ file: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.file !== "") {
      let formData = new FormData();
      formData.append("file", this.state.file);

      const userData = {
        handle: this.state.handle,
        price: this.state.price,
        category: this.state.category,
        name: this.state.name,
        bio: this.state.bio,
        website: this.state.website,
        instagram: this.state.instagram,
        phone: this.state.phone
      };

      this.props.updateVendor2(formData, userData);
    } else {
      const userData = {
        handle: this.state.handle,
        price: this.state.price,
        category: this.state.category,
        name: this.state.name,
        bio: this.state.bio,
        website: this.state.website,
        instagram: this.state.instagram,
        phone: this.state.phone
      };

      this.props.updateVendor(userData);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    console.log(this.state);
    return (
      <div>
        <div id="contact" style={{ marginTop: "50px" }}>
          <div className="container">
            <Adminnav />
            <div className="row" style={{ minHeight: "450px" }}>
              <div className="col-md-12">
                <div className="contact-white">
                  <h3 className="text-uppercase text-center">Update Vendor</h3>
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
                        disabled
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
                      />
                      <p>
                        Only select file if you want to change the profile
                        picture...
                      </p>
                      {errors.file && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.file}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
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
                    </div>
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
                    <div className="text-center">
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-light mysubmit"
                      />
                    </div>
                  </form>
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
  getByHandleVendor: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  updateVendor: PropTypes.func.isRequired,
  updateVendor2: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
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
  { updateVendor, updateVendor2, getCategories, getByHandleVendor }
)(Addvendors);
