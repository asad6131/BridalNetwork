import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Adminnav from "../nav.js";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";

import {
  deleteVendor,
  addBrochure,
  removeBrochure,
  getVendors,
  getVendors2,
  markDisable,
  markEnable,
  markFeature,
  markUnfeature,
  markTop,
  markUnTop,
  getVendorsUser,
  enableMSg,
  disableMsg,
  assignUser
} from "../../../actions/admin/vendorActions";

class Vendors extends Component {
  constructor() {
    super();
    this.state = {
      handle: null,
      user_id: "",
      vendor_id: "",
      file: "",
      vendors: [],
      users: [],
      errors: {}
    };
  }

  changeID(handle) {
    this.setState({ handle });
  }

  changeVendorID(id) {
    this.setState({ vendor_id: id });
  }

  onChangeUser(e) {
    e.preventDefault();
    this.setState({ user_id: e.target.value });
  }

  onChange(e) {
    e.preventDefault();

    const fileType = e.target.files[0].type;
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf"
    ];

    if (validImageTypes.includes(fileType)) {
      if (e.target.files[0].size < 12000000) {
        this.setState({
          file: e.target.files[0]
        });
      } else {
        alert("File size must be less than 10MB");
      }
    } else {
      alert("Invalid File Type");
    }
    // this.setState({ file: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", this.state.file);

    const userData = {
      handle: this.state.handle
    };

    this.props.addBrochure(formData, userData);
  }

  onSubmitAssignedUser(e) {
    e.preventDefault();

    const data = {
      user_id: this.state.user_id,
      vendor_id: this.state.vendor_id
    };
    this.props.assignUser(data);
    // console.log(data, "asda dasd a dad a dad");
  }

  onRemove(e) {
    e.preventDefault();
    const userData = {
      handle: this.state.handle
    };

    if (window.confirm("Do you really want to remove current brochure?")) {
      this.props.removeBrochure(userData);
    }
  }

  deleteVendor(id) {
    if (window.confirm("Do you really want to delete this vendor?")) {
      this.props.deleteVendor(id);
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push("/");
    }

    this.props.getVendors2();
    this.props.getVendorsUser();
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
      this.setState({ vendors: nextProps.vendor.vendors });
    }

    if (nextProps.vendor) {
      this.setState({ users: nextProps.vendor.users });
    }
  }

  listingImage(name) {
    return (
      <div>
        <div
          className="user d-inline-block"
          style={{ height: "75px", width: "75px" }}
        >
          <span>
            <img
              alt="Profile"
              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
              src={name}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#060606"
              }}
            />
          </span>
        </div>
      </div>
    );
  }

  onFeatureClick(handle, id) {
    const data = { handle: handle };
    if (id == "1") {
      this.props.markFeature(data);
    } else {
      this.props.markUnfeature(data);
    }
  }

  onTopClick(handle, id) {
    const data = { handle: handle };
    if (id == "1") {
      this.props.markTop(data);
    } else {
      this.props.markUnTop(data);
    }
  }

  onActiveClick(handle, id) {
    const data = { handle: handle };
    if (id == "1") {
      this.props.markEnable(data);
    } else {
      this.props.markDisable(data);
    }
  }

  onMsgClick(handle, id) {
    const data = { handle: handle };
    if (id == "1") {
      this.props.enableMSg(data);
    } else {
      this.props.disableMsg(data);
    }
  }

  render() {
    const { errors } = this.props;
    const { vendors } = this.props.vendor;
    let listings = vendors.map((value, index) => {
      let featured = value.featured ? (
        <button
          className="btn btn-xs btn-info"
          onClick={this.onFeatureClick.bind(this, value.handle, 2)}
          style={{ width: "100%" }}
        >
          Mark Unfeature
        </button>
      ) : (
          <button
            className="btn btn-xs btn-warning"
            onClick={this.onFeatureClick.bind(this, value.handle, 1)}
            style={{ width: "100%" }}
          >
            Mark Feature
        </button>
        );
      let top = value.top ? (
        <button
          className="btn btn-xs btn-info"
          onClick={this.onTopClick.bind(this, value.handle, 2)}
          style={{ width: "100%" }}
        >
          Remove from Top
          </button>
      ) : (
          <button
            className="btn btn-xs btn-warning"
            onClick={this.onTopClick.bind(this, value.handle, 1)}
            style={{ width: "100%" }}
          >
            Move to Top
          </button>
        );
      let active = value.active ? (
        <button
          className="btn btn-xs btn-danger"
          onClick={this.onActiveClick.bind(this, value.handle, 2)}
          style={{ width: "100%" }}
        >
          Disable
        </button>
      ) : (
          <button
            className="btn btn-xs btn-success"
            onClick={this.onActiveClick.bind(this, value.handle, 1)}
            style={{ width: "100%" }}
          >
            Enable
        </button>
        );
      let msg = value.msg ? (
        <button
          className="btn btn-xs btn-danger"
          onClick={this.onMsgClick.bind(this, value.handle, 2)}
          style={{ width: "100%" }}
        >
          Disable Msg
          </button>
      ) : (
          <button
            className="btn btn-xs btn-success"
            onClick={this.onMsgClick.bind(this, value.handle, 1)}
            style={{ width: "100%" }}
          >
            Enable Msg
          </button>
        );
      let brochure = value.brochure ? value.brochure : "";
      return {
        id: index + 1,
        name: value.name,
        username: value.handle,
        category: value.category.name,
        vendor: value.user.first_name + " " + value.user.last_name,
        brochure: (
          <div>
            <a href={brochure} target="_blank">
              {brochure !== "" ? "Yes" : "No"}
            </a>
          </div>
        ),
        action: (
          <div className="dropdown">
            <button className="btn btn-danger btn-xs dropdown-toggle" type="button" data-toggle="dropdown">Actions List
            <span className="caret"></span></button>
            <ul className="dropdown-menu" style={{ padding: ".5rem" }}>
              <li><Link
                to={"/admin/vendors/update/" + value.handle}
                className="btn btn-xs btn-info"
                style={{ width: "100%" }}
              >
                Update
            </Link></li>
              <li><button
                className="btn btn-xs btn-primary"
                onClick={this.changeVendorID.bind(this, value._id)}
                style={{ width: "100%" }}
                data-toggle="modal"
                data-target="#vendor_modal"
              >
                Assign User
            </button></li>
              <li>{active}</li>
              <li><Link
                to={`/admin/vendors/slider/${value._id}`}
                className="btn btn-xs btn-warning"
                style={{ width: "100%" }}
              >
                Slider
              </Link>
              </li>
              <li>{msg}</li>
              <li>{featured}</li>
              <li>{top}</li>
              <li><button
                onClick={this.deleteVendor.bind(this, value._id)}
                className="btn btn-xs btn-danger"
                style={{ width: "100%" }}
              >
                Delete
            </button>
              </li>
              {/* <li>
                <Link
              to={"/admin/vendors/slider/" + value.handle}
              className="btn btn-xs btn-primary"
              style={{ fontSize: "0.6rem" }}
            >
              Slider Images
            </Link>
            
            
            <button
              className="btn btn-xs btn-primary"
              onClick={this.changeID.bind(this, value.handle)}
              style={{ marginLeft: "5px", fontSize: "0.6rem" }}
              data-toggle="modal"
              data-target="#brochure_modal"
            >
              Brochure
            </button>
              </li> */}
            </ul>
          </div>
        )
      };
    });
    const data = {
      columns: [
        {
          label: "Sr #",
          field: "id"
        },
        {
          label: "Name",
          field: "name"
        },
        {
          label: "Username",
          field: "username"
        },
        {
          label: "Category",
          field: "category"
        },
        {
          label: "Vendor",
          field: "vendor"
        },
        {
          label: "Brochure",
          field: "brochure"
        },
        {
          label: "Actions",
          field: "action"
        }
      ],
      rows: listings
    };
    return (
      <div>
        <div id="contact" style={{ marginTop: "50px" }}>
          <div className="container">
            <Adminnav />

            {/* <Link to="/inbox/5cb08283b2c9ec1534b4db21">Send Message</Link> */}
            <div className="row" style={{ minHeight: "450px" }}>
              <div className="col-md-12">
                <h2 style={{ margin: "20px auto" }}>All Vendors</h2>
                <MDBDataTable
                  striped
                  bordered
                  responsive
                  hover
                  style={{ minHeight: '500px' }}
                  paginationLabel={["<", ">"]}
                  data={data}
                />
              </div>
            </div>
          </div>
        </div>
        <div id="vendor_modal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Assign Engineer</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <form onSubmit={this.onSubmitAssignedUser.bind(this)}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Select User:</label>
                    <select
                      name="user_id"
                      className="form-control"
                      onChange={this.onChangeUser.bind(this)}
                    >
                      <option value="">Select User</option>
                      {this.state.users &&
                        this.state.users.length > 0 &&
                        this.state.users.map((item, index) => {
                          return (
                            <option value={item._id} key={index}>
                              {item.first_name} {item.last_name} ({item.email})
                            </option>
                          );
                        })}
                    </select>
                    {errors.user_id && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.user_id}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ width: "100%" }}
                  >
                    Assign User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="brochure_modal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Brochure</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="modal-body">
                  <div className="form-group">
                    <label for="file">
                      Brochure File (pdf, jpg, jpeg, png):
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      className="form-control"
                      onChange={this.onChange.bind(this)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ width: "100%" }}
                  >
                    Update Brochure
                  </button>
                </div>
              </form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onRemove.bind(this)}
                >
                  Remove Any Current Broucher
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Vendors.propTypes = {
  markDisable: PropTypes.func.isRequired,
  markEnable: PropTypes.func.isRequired,
  markFeature: PropTypes.func.isRequired,
  markUnfeature: PropTypes.func.isRequired,
  markTop: PropTypes.func.isRequired,
  markUnTop: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  addBrochure: PropTypes.func.isRequired,
  removeBrochure: PropTypes.func.isRequired,
  getVendors2: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  getVendorsUser: PropTypes.func.isRequired,
  assignUser: PropTypes.func.isRequired,
  disableMsg: PropTypes.func.isRequired,
  enableMSg: PropTypes.func.isRequired,
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
  {
    deleteVendor,
    addBrochure,
    removeBrochure,
    getVendors,
    getVendors2,
    markDisable,
    markEnable,
    markFeature,
    markUnfeature,
    markTop,
    markUnTop,
    getVendorsUser,
    enableMSg,
    disableMsg,
    assignUser
  }
)(Vendors);
