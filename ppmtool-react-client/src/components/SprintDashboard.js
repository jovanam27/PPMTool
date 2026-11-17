import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSprints } from "../actions/sprintActions";
import SprintItem from "./Sprint/SprintItem";

class SprintDashboard extends Component {
  componentDidMount() {
    this.props.getSprints();
  }
  render() {
    const { sprints } = this.props.sprint;
    const listaSprintova = sprints.map((sprint) => (
      <SprintItem key={sprint.id} sprint={sprint}></SprintItem>
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-auto">
            <h1 className="display-4 text-center">Sprints</h1>
            <br />
            <Link to="/addSprint" className="btn btn-info btn-lg">
              Create a Sprint
            </Link>
            <hr />
            {listaSprintova}
          </div>
        </div>
      </div>
    );
  }
}

SprintDashboard.propTypes = {
  getSprints: PropTypes.func.isRequired,
  sprint: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  sprint: state.sprint,
});

export default connect(mapStateToProps, { getSprints })(SprintDashboard);
