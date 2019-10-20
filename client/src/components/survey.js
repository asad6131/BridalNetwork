import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Addcategories extends Component {

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    if (this.props.auth.user.user_type != "1") {
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
				<div id="contact">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="contact-white">
									<h3 className="text-uppercase text-center">PLAN YOUR WEDDING</h3>
									<form>
									  <div className="form-row">
									    <div className="form-group col-md-12">
									      <input type="date" className="form-control" id="date" name="date" placeholder="Your Wedding Date" />
									    </div>
									  </div>
									  <div className="form-group">
									    <input type="text" className="form-control" id="phone" name="phone" placeholder="Contact No." />
									  </div>
									  <div className="form-row">
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="venue" name="venue" placeholder="Venue" />
									  	</div>
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="duration" name="duration" placeholder="Duration of Wedding" />
									  	</div>
									  </div>
									  <div className="form-row">
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="fax" name="fax" placeholder="No. Fax" />
									  	</div>
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="hours" name="hours" placeholder="How many hours" />
									  	</div>
									  </div>
									  <div className="form-row">
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="outfit" name="outfit" placeholder="Bridal Outfit" />
									  	</div>
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="budget" name="budget" placeholder="Budget Range" />
									  	</div>
									  </div>
									  <div className="form-group">
									     <input type="text" className="form-control" id="artist" name="artist" placeholder="Separate Make Up Artist?" />
									  </div>
									  <div className="form-row">
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="deco" name="deco" placeholder="Deco and Catering" />
								  		</div>
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="budget1" name="budget1" placeholder="Budget Range" />
									  	</div>
									  </div>
									  <div className="form-row">
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="photography" name="photography" placeholder="Photography" />
								  		</div>
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="budget2" name="budget2" placeholder="Budget Range" />
									  	</div>
									  </div>
									  <div className="form-row">
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="videography" name="videography" placeholder="Videography" />
								  		</div>
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="budget3" name="budget3" placeholder="Budget Range" />
									  	</div>
									  </div>
									  <div className="form-row">
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="berkat" name="berkat" placeholder="Berkat / Door Gifts" />
								  		</div>
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="henna" name="henna" placeholder="Henna" />
									  	</div>
									  </div>
									  <div className="form-row">
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="cakes" name="cakes" placeholder="Wedding Cakes" />
								  		</div>
									  	<div className="form-group col-md-6">
									     <input type="text" className="form-control" id="groom" name="groom" placeholder="Groom Stylist" />
									  	</div>
									  </div>
									  <div className="form-group">
									  	<textarea className="form-control" id="comments" name="comments" rows="3" placeholder="Write your special request or comments here.."></textarea>
									  </div>
									  <div className="text-center">
									  	<input type="submit" value="Submit" className="btn btn-light mysubmit"/>
									  </div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)

	}

}


Addcategories.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})(Addcategories);
