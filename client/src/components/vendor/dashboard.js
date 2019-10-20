import React, { Component } from "react";
import InnerNav from "../innerNav";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getByUserID, getFavByUserID, getViewsByUserID
} from "../../actions/admin/vendorActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor: {},
      views: 0,
      fav: 0
    }
  }

  componentDidMount() {
    this.props.getByUserID(this.props.auth.user.id);
    this.props.getFavByUserID(this.props.auth.user.id);
    this.props.getViewsByUserID(this.props.auth.user.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.vendor) {
      this.setState({ vendor: nextProps.vendor.vendor });
      this.setState({ fav: nextProps.vendor.fav.length });
      this.setState({ views: nextProps.vendor.views });
    }
  }
  render() {
    // console.log(this.state);
    return (
      <section
        id="vendor2"
        className="gallery traffic"
        style={{ marginTop: "50px" }}
      >
        <div className="container-fluid">
          <div className="row">
            <InnerNav />
            <div className="col-md-10 right-content">
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane show active">
                  <div className="container">
                    <div id="contact">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="contact-white">
                              <h3 className="text-uppercase text-center">
                                OVERVIEWs
                              </h3>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="stats">
                                    <h1>{this.state.vendor && this.state.vendor.views && this.state.vendor.views.length}</h1>
                                    <h6>views in vendor page</h6>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="stats">
                                    <h1>{this.state.fav}</h1>
                                    <h6>no of saved</h6>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="stats">
                                    <h1>{this.state.views}</h1>
                                    <h6>views in results page</h6>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}



Dashboard.propTypes = {
  getByUserID: PropTypes.func.isRequired,
  getFavByUserID: PropTypes.func.isRequired,
  getViewsByUserID: PropTypes.func.isRequired,
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
  { getByUserID, getFavByUserID, getViewsByUserID }
)(Dashboard);
