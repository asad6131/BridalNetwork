import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import { Link } from 'react-router-dom';

import { getCategories } from "../actions/admin/categoryActions";
import { getVendors } from "../actions/admin/vendorActions";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			vendors: [],
			slider_imgs: [],
			tags: ''
		}
	}

	componentDidMount() {
		this.props.getCategories();
		this.props.getVendors();
    
    const parsed = queryString.parse(this.props.location.search);
    if(parsed && parsed.tag) {
      this.setState({ tags: parsed.tag });
    } else {      
      this.setState({ tags: '' });
    }    
	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.category) {
      this.setState({ categories: nextProps.category.categories });
    }

    if (nextProps.vendor) {
			this.setState({ vendors: nextProps.vendor.vendors });
			nextProps.vendor.vendors.map((v, index) => {
				v.slider.map((s, index) => {
					
					if(this.state.tags !== '') {
						if(s.tags) {
							if(s.tags.includes(this.state.tags))
							this.state.slider_imgs.push(s.img);
						}
					} else {
						this.state.slider_imgs.push(s.img);
					}
					
				})				
			})
    }
	}

	render () {		
		return (
			<div>
				<div id="search" style={{marginTop: "50px"}}>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<form>
									<div className="form-group">
										<div className="col-4">
											<input type="text" className="form-control form-control-sm" id="tag" name="tag" placeholder="Search for your inspiration..." />
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<section id="main">
					<div className="container">
						<div className="white-bg">
							<div className="card-columns">
								{this.state.slider_imgs.map((item, index) => {
									return (
										// <Link to={'/vendors'} key={index}>
											<div className="pink-border" key={index}>
												<div className="card">
													<img className="card-img-top" src={item} alt="Bride 1" />
													<div className="card-body">
														{/* <h6 className="card-title text-uppercase">ahrmaye photography</h6> */}
														{/* <p className="card-text text-uppercase">{item.tags}</p> */}
													</div>
												</div>
											</div>
										// </Link>
									);
								})}
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

Home.propTypes = {
	getCategories: PropTypes.func.isRequired,
	getVendors: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	category: state.category,
	vendor: state.vendor
});

export default connect(mapStateToProps, {getCategories,getVendors})(Home);

