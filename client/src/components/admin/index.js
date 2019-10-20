import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Adminnav from "./nav.js";

class VendorsMain extends Component {

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push('/');
    }
  }

	render () {
		return (
			<div>
				<div id="search">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<form>
								  <div className="form-group">
								    <div className="col-4">
								    	<input type="text" className="form-control form-control-sm" id="search" name="search" placeholder="Search for your inspiration..." />
								    </div>
								  </div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div id="contact" style={{minHeight: "500px"}}>
					<div className="container">
            <Adminnav />
						<div className="row" style={{minHeight: "450px"}}>
							<div className="col-md-12">
                <h2 style={{textAlign: "center", 
                  fontSize: "10rem",
                  color: "#aaa6a6",
                  fontWeight: "bold",
                  marginTop: "8%"}}>
                  Admin Panel
                </h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		)

	}

}

VendorsMain.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})(VendorsMain);
