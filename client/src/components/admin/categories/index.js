import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Adminnav from "../nav.js";
import { MDBDataTable } from "mdbreact"; 

import { getCategories, updateCategory2, updateCategory } from "../../../actions/admin/categoryActions";

class Categories extends Component {
  constructor() {
    super();
    this.state = {
			categories: [],
      errors: {},
      file: '',
      title: '',
      id: ''
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push('/');
		}
		
		this.props.getCategories();
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

    if (nextProps.category) {
      this.setState({ category: nextProps.category.categories });
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

  onSubmit(e) {
    e.preventDefault();

    if(this.state.file !== '') {
      let formData = new FormData();
      formData.append("file", this.state.file);
      const userData = {
        id: this.state.id,
        title: this.state.title
      };
      this.props.updateCategory2(formData, userData);
    } else {
      const userData = {
        id: this.state.id,
        title: this.state.title
      };
      this.props.updateCategory(userData);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeID(id, title) {
    this.setState({ id, title });
  }

  onChangeFile(e) {
    e.preventDefault();

    const  fileType = e.target.files[0].type;
		const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

		if (validImageTypes.includes(fileType)) {
			if(e.target.files[0].size < 12000000) {
					this.setState({
						file: e.target.files[0]
					});
			} else {
					alert('File size must be less than 10MB');
			}
		} else {
			alert('Invalid File Type');
    }
  }

	render () {
    // console.log(this.state);
		const { categories } = this.props.category;
		let listings = categories.map((value, index) => {
      return {
        id: index + 1,
        name: value.name,
        img: this.listingImage(value.avatar),
        actions: (
          <div>
            <a href="#" onClick={this.changeID.bind(this, value._id, value.name)} data-toggle="modal" data-target="#cat_update_modal" className="btn btn-primary btn-xs">Update</a>
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
          field: "name",
        },
        {
          label: "Image",
          field: "img",
        },
        {
          label: "Actions",
          field: "actions",
        }
      ],
      rows: listings
    };
		return (
			<div>
				{/* <div id="search">
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
				</div> */}
				<div id="contact" style={{marginTop: "50px"}}>
					<div className="container">
            <Adminnav />
						<div className="row" style={{minHeight: "450px"}}>
							<div className="col-md-12">
                <h2 style={{margin: "20px auto"}}>All Categories</h2>
								<MDBDataTable
                  striped
                  bordered
                  responsive
                  hover
                  paginationLabel={["<", ">"]}
                  data={data}
                />
							</div>
						</div>
					</div>
				</div>
        <div id="cat_update_modal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Category</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <form onSubmit={this.onSubmit.bind(this)}>
                <div class="modal-body">
                  <p>
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" class="form-control" onChange={this.onChange.bind(this)} value={this.state.title} />
                  </div>
                  <div class="form-group">
                    <label for="file">Image (jpg, jpeg, png):</label>
                    <input type="file" id="file" name="file" class="form-control" onChange={this.onChangeFile.bind(this)} />
                  </div>
                  </p>
                  <button type="submit" class="btn btn-success" style={{width: "100%"}}>Update</button>
                </div>
              </form>
              <div class="modal-footer">   
                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
			</div>
		)

	}

}

Categories.propTypes = {
		getCategories: PropTypes.func.isRequired,
		updateCategory: PropTypes.func.isRequired,
		updateCategory2: PropTypes.func.isRequired,
  	auth: PropTypes.object.isRequired,
  	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  	auth: state.auth,
		errors: state.errors,
		category: state.category
});

export default connect(mapStateToProps, {getCategories, updateCategory2, updateCategory})(Categories);
