import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Adminnav from "../nav.js";
import { MDBDataTable } from "mdbreact"; 
import moment from 'moment';

import { getPlans } from "../../../actions/admin/plansActions";

class Plans extends Component {
  constructor() {
    super();
    this.state = {
			plans: [],
      errors: {}
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    if (this.props.auth.user.user_type !== "1") {
      this.props.history.push('/');
		}
		
		this.props.getPlans();
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

    if (nextProps.plans) {
      this.setState({ plans: nextProps.plans.plans });
    }
  }
	
	render () {
		
		const { plans } = this.props.plans;
		let listings = plans.map((value, index) => {
      return {
        id: index + 1,
        artist: (value.artist === '1') ? 'Yes' : 'No',          
        berkat: (value.berkat === '1') ? 'Yes' : 'No',          
        budget: value.budget,          
        cakes: (value.cakes === '1') ? 'Yes' : 'No',          
        date: moment(value.date).format("DD-MM-YYYY"),          
        deco: value.deco,
        deco_budget: value.deco_budget,
        duration: value.duration,
        hours: value.hours,          
        outfits: value.outfits,
        outfits_budget: value.outfits_budget,
        pax: value.pax,
        photography_budget: value.photography_budget,
        stylist: (value.stylist === '1') ? 'Yes' : 'No',
        videography: value.videography,
        videography_budget: value.videography_budget
      };
    });
    const data = {
      columns: [
        {
          label: "Sr #",
          field: "id"
        },
        {
          label: "Artist",
          field: "artist",
        },
        {
          label: "Berkat",
          field: "berkat",
        },
        {
          label: "Budget",
          field: "budget",
        },
        {
          label: "Cakes",
          field: "cakes",
        },
        {
          label: "Date",
          field: "date",
        },
        {
          label: "Deco",
          field: "deco",
        },
        {
          label: "Deco Budget",
          field: "deco_budget",
        },
        {
          label: "Duration",
          field: "duration",
        },
        {
          label: "Hours",
          field: "hours",
        },
        {
          label: "Outfits",
          field: "outfits",
        },
        {
          label: "Outfits Budget",
          field: "outfits_budget",
        },
        {
          label: "Pax",
          field: "pax",
        },
        {
          label: "Photography",
          field: "photography_budget",
        },
        {
          label: "Stylist",
          field: "stylist",
        },
        {
          label: "Videography",
          field: "videography",
        },
        {
          label: "Videography Budget",
          field: "videography_budget",
        }
      ],
      rows: listings
    };
		return (
			<div>
				<div id="contact" style={{marginTop: "50px"}}>
					<div className="container">
            <Adminnav />
						<div className="row" style={{minHeight: "450px"}}>
							<div className="col-md-12">
                <h2 style={{margin: "20px auto"}}>All Plans</h2>
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
			</div>
		)

	}

}

Plans.propTypes = {
	getPlans: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
	errors: state.errors,
	plans: state.plans
});

export default connect(mapStateToProps, {getPlans})(Plans);
