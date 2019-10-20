import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Adminnav from "../nav.js";

import { getByHandleVendor, addSlider, deleteSlider } from "../../../actions/admin/vendorActions";

class Slider extends Component {
  constructor() {
    super();
    this.state = {
			vendor: {},
      errors: {},
      sliders: [],
      handle: '',
      tags: '',
      file: null,
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push('/');
		}
    this.setState({handle : this.props.match.params.handle});
    this.props.getByHandleVendor(this.props.match.params.handle);
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

    if (nextProps.vendor) {
      this.setState({ vendor: nextProps.vendor.vendor });
      this.setState({ sliders: nextProps.vendor.vendor.slider });
    }
  }


  listingImage(name) {
    return (
      <div>
        <div className="user d-inline-block" style={{height: "75px", width: "75px"}}>
          <span>
            <img
              alt="Profile"
              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
							src={name}
							style={{width: "100%", height: "100%", backgroundColor: "#060606"}}
            />
          </span>
        </div>
      </div>
    );
  }

  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);

		if (this.state.file !== null) {
			let formData = new FormData();
			formData.append("file", this.state.file);
			this.props.addSlider(formData, this.state.handle, this.state.tags);
		} else {
			alert('Please select any image.');
		}
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

  deleteIMG(id, handle) {
    var r = window.confirm("Are you sure you want to delete this image!");
    if (r === true) {
      this.props.deleteSlider(id, handle);
    }
  }
	
	render () {
		const { errors } = this.state;
    // const { vendors } = this.props.vendor;
    // console.log(this.state);
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
            <Adminnav />
						<div className="row" style={{minHeight: "450px"}}>
							<div className="col-md-12">
                <h2 style={{margin: "20px auto"}}>Slider Images for: {this.state.handle} <button type="button" className="btn btn-info btn-xs" data-toggle="modal"  style={{float: "right"}}  data-target="#myModal">Add Image</button></h2>
                
								<div className="row">
                  <div className="col-md-12">
                    {this.state.sliders.map((item, index) => {
                      let tags = (item.tags) ? item.tags.split(',') : [];
                      return (
                        <div key={index} className="card" style={{width: "18rem", display: "inline-block"}}>
                          <img className="card-img-top" src={item.img} alt="Card" />
                          <div className="card-body">
                            <button onClick={this.deleteIMG.bind(this, item._id, this.state.handle)} className="btn btn-danger">Delete</button>
                            <br />
                            <b>Tags:</b> {tags.map((tag, index) => {
                              return (
                                <span class="badge badge-success" key={index} style={{marginRight: "5px"}}>{tag}</span>
                              )
                            })}
                          </div>
                      </div>
                      )
                    })}
                  </div>
                </div>
							</div>
						</div>
					</div>
				</div>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Slider Image</h4>
              </div>
              <div className="modal-body">
                  <form onSubmit={this.onSubmit} onKeyPress={this.onKeyPress}>
									  <div className="form-group">
									      <input type="file" className="form-control" onChange={this.onChangeFile} id="file" name="file" />
											{errors.file && (
												<div className="error" style={{color: "red"}}>
													{errors.file}
												</div>
											)}
									  </div>             
                    {/* data-role="tagsinput"        */}
									  <div className="form-group">
									      <input type="text" className="form-control" onChange={this.onChange} id="tags" name="tags" placeholder="Tags Comma Separated Values" />
											{errors.tags && (
												<div className="error" style={{color: "red"}}>
													{errors.tags}
												</div>
											)}
									  </div>
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                
                <button type="submit" style={{float: "right"}} className="btn btn-primary">Add Image</button>
                  </form>
              </div>
            </div>
          </div>
        </div>


			</div>
		)

	}

}

Slider.propTypes = {
  deleteSlider: PropTypes.func.isRequired,
  addSlider: PropTypes.func.isRequired,
	getByHandleVendor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
	errors: state.errors,
	vendor: state.vendor
});

export default connect(mapStateToProps, { getByHandleVendor, addSlider, deleteSlider })(Slider);
