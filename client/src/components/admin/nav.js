import React, { Component } from "react";
import { Link } from "react-router-dom";

class Adminnav extends Component {
	render () {
		return (
			<div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Admin Side</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent2" aria-controls="navbarSupportedContent2" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent2">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categories
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={'/admin/categories/add'}>Add Category</Link>
                  <Link className="dropdown-item" to={'/admin/categories'}>Manage Categories</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Vendors
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={'/admin/vendors/add'}>Add Vendor</Link>
                  <Link className="dropdown-item" to={'/admin/vendors'}>Manage Vendor</Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/admin/plans'}>Wedding Plans</Link>
              </li>
            </ul>
          </div>
        </nav>
			</div>
		)

	}

}

export default Adminnav;
