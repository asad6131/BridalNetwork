import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCategories } from "../actions/admin/categoryActions";
import { getVendorsUnderBudget, getByHandleVendorWithCat, getVendors } from "../actions/admin/vendorActions";
// import queryString from 'query-string';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      errors: {},
      vendors: [],
      vendor: {},
      category: {},
      slider: []
    }
  }

  componentDidMount() {
    this.props.getCategories();
    if (localStorage.BridalNetworkSearch) {
      this.props.getVendorsUnderBudget(JSON.parse(localStorage.BridalNetworkSearch));
    } else {
      this.props.getVendors();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.vendor) {
      this.setState({ vendors: nextProps.vendor.vendors });
    }

    if (nextProps.vendor) {
      this.setState({ vendor: nextProps.vendor.vendor });
    }

    if (nextProps.vendor) {
      this.setState({ category: nextProps.vendor.vendor.category });
    }

    if (nextProps.vendor) {
      this.setState({ slider: nextProps.vendor.vendor.slider });
    }

    if (nextProps.category) {
      this.setState({ categories: nextProps.category.categories });
    }
  }

  fetchVender(handle) {
    this.props.getByHandleVendorWithCat(handle);
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <section id="vendor2" style={{ marginTop: "50px" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 left-nav">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  {this.state.categories.map((cat, index) => {
                    let flag = (index === 0) ? 'active' : '';
                    return (
                      <a className={"nav-link text-uppercase " + flag} key={index + '_cat_toggle'} data-toggle="tab" href={"#pills_" + cat._id} role="tab">{cat.name}</a>
                    )
                  })}
                </div>
              </div>
              <div className="col-md-9 right-content" style={{ backgroundColor: "#F7E3DA" }}>
                <div className="tab-content" id="v-pills-tabContent">
                  {this.state.categories.map((cat, index) => {
                    let flag = (index === 0) ? 'active' : '';
                    return (
                      <div className={"tab-pane fade show " + flag} key={index + '_cat'} id={"pills_" + cat._id} role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="container">
                          <div className="row">
                            {this.state.vendors.map((v, index) => {
                              return (v.category._id === cat._id) ?
                                <div className="col-md-4 col-sm-6" key={index + '_v'}>
                                  {/* <a href="/" > */}
                                  <a href="/" data-toggle="modal" data-target="#exampleModal" onClick={this.fetchVender.bind(this, v.handle)}>
                                    <div className="v2-box">
                                      <img src={(v.slider.length > 0) ? v.slider[0].img : 'https://storage.googleapis.com/estatecowork.appspot.com/9b53e81e-496f-11e9-9234-0123456789ab-1552907930767-Bridal%20Logo%202.png'} className="img-fluid" alt="" />
                                      <div className="v2-caption">
                                        <h6 className="text-uppercase">{v.name}</h6>
                                      </div>
                                    </div>
                                  </a>
                                  {/* </a> */}
                                </div>
                                :
                                "";
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Vendor Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h6>Name</h6>
                <p>{this.state.vendor && (this.state.vendor.name) ? this.state.vendor.name : '-'}</p>
                <h6>Category</h6>
                <p>{this.state.category && (this.state.category.name) ? this.state.category.name : '-'}</p>
                {/* <h6>Cost</h6>
                <p>{this.state.vendor && (this.state.vendor.price) ? '$' + this.state.vendor.price : '-'}</p> */}
                {/* <h6>Brochure</h6>
                <p>{this.state.vendor && (!this.state.vendor.pdf) ? <a href={this.state.vendor.pdf} download>Download</a> : '-'}</p> */}
                <h6>Website</h6>
                <p>{this.state.vendor && (this.state.vendor.website) ? this.state.vendor.website : '-'}</p>
                <h6>Profile</h6>
                <p><a href={this.state.vendor && (this.state.vendor.handle) ? '/vendors/profile/' + this.state.vendor.handle + '?plan=true' : '#' + '?plan=true'} target="_blank">{this.state.vendor && (this.state.vendor.handle) ? 'Profile Link' : 'No Profile'}</a></p>
                {/* <h6>Phone</h6>
                <p>{this.state.vendor && (this.state.vendor.phone) ? this.state.vendor.phone : '-'}</p> */}
                <h6>Instagram</h6>
                <p>{this.state.vendor && (this.state.vendor.instagram) ? this.state.vendor.instagram : '-'}</p>
                <h6>Gallery</h6>
                {this.state.slider && this.state.slider.map((item, index) => {
                  return (
                    <img src={item.img} key={index} style={{ maxWidth: "32.3333%" }} class="img-thumbnail img-responsive" alt="Gallery" />
                  );
                })}

              </div>
            </div>
          </div>
        </div>

      </div>
    )

  }

}

Search.propTypes = {
  getVendors: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getCategories, getVendorsUnderBudget, getByHandleVendorWithCat, getVendors })(Search);