import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Adminnav from "../nav.js";
import {addCategory} from "../../../actions/admin/categoryActions";

class Addcategories extends Component {
  constructor() {
    super();
    this.state = {
		file: null,
      name: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    if (nextProps.auth.user.user_type !== "1") {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
		e.preventDefault();

		if (this.state.file !== null) {
			let formData = new FormData();
			console.log(this.state);
			formData.append("file", this.state.file);

			this.props.addCategory(formData, this.state.name);
		} else {
			alert('Please select any image.');
		}
  }

  onChangeFile = (e) => {
		e.preventDefault();

		const  fileType = e.target.files[0].type;
		const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];

		if (validImageTypes.includes(fileType)) {
			if(e.target.files[0].size < 2000000) {
					this.setState({
						file: e.target.files[0]
					});
			} else {
					alert('File size must be less than 2MB');
			}
		} else {
			alert('Please select Image only');
		}
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

	render () {
		const {errors} = this.state;
		// console.log(this.state);
		return (
			<div>
				<div id="contact" style={{marginTop: "50px"}}>
					<div className="container">
            		<Adminnav />
						<div className="row" style={{minHeight: "450px"}}>
						<div className="col-md-12">
								<div className="contact-white">
									<h3 className="text-uppercase text-center">Add Category</h3>
									<form onSubmit={this.onSubmit}>
									  <div className="form-group">
									      <input type="text" className="form-control" value={this.state.name} onChange={this.onChange} id="name" name="name" placeholder="Category Name" />
											{errors.name && (
												<div className="error" style={{color: "red"}}>
													{errors.name}
												</div>
											)}
									  </div>
									  <div className="form-group">
									      <input type="file" className="form-control" onChange={this.onChangeFile} id="file" name="file" placeholder="Category Name" />
											{errors.file && (
												<div className="error" style={{color: "red"}}>
													{errors.file}
												</div>
											)}
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
	addCategory: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {addCategory})(Addcategories);
