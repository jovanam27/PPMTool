import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getSprint,
  updateSprint,
  clearErrors,
} from "../../actions/sprintActions";
import classnames from "classnames";

class UpdateSprint extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
      status: "",
      projectIdentifier: "",
      id: "",
      sprintSequence: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { s_id } = this.props.match.params;
    this.props.getSprint(s_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      name,
      goal,
      startDate,
      endDate,
      status,
      projectIdentifier,
      id,
      sprintSequence,
    } = nextProps.sprint;

    this.setState({
      name,
      goal,
      startDate,
      endDate,
      status,
      projectIdentifier,
      id,
      sprintSequence,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const updateSprint = {
      name: this.state.name,
      goal: this.state.goal,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      status: this.state.status,
      projectIdentifier: this.state.projectIdentifier,
      id: this.state.id,
      sprintSequence: this.state.sprintSequence,
    };
    this.props.updateSprint(
      this.state.sprintSequence,
      updateSprint,
      this.props.history
    );
    this.props.clearErrors();
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <button
              className="btn btn-light"
              onClick={() => {
                this.props.clearErrors();
                this.props.history.push("/sprintDashboard");
              }}
            >
              Back to Sprint Dashboard
            </button>
            <br />
            <br />
            <h4 className="display-4 text-center">Update Sprint form</h4>
            <hr />
            <form onSubmit={this.onSubmit}>
              <h6>Project Identifier</h6>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Project Identifier"
                  name="projectIdentifier"
                  value={this.state.projectIdentifier}
                  onChange={this.onChange}
                  disabled
                ></input>
              </div>
              <h6>Sprint Name</h6>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name,
                  })}
                  placeholder="Sprint Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                ></input>
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <h6>Goal</h6>
              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Goal"
                  value={this.state.goal}
                  onChange={this.onChange}
                  name="goal"
                ></textarea>
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.startDate,
                  })}
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.onChange}
                ></input>
                {errors.startDate && (
                  <div className="invalid-feedback">{errors.startDate}</div>
                )}
              </div>
              <h6>End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.endDate,
                  })}
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.onChange}
                ></input>
                {errors.endDate && (
                  <div className="invalid-feedback">{errors.endDate}</div>
                )}
              </div>
              <h6>Status</h6>
              <div className="form-group">
                <select
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.status,
                  })}
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  <option value="PLANNED">PLANNED</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>
              <input
                type="submit"
                className="btn btn-block btn-primary mt-4"
              ></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UpdateSprint.propTypes = {
  getSprint: PropTypes.func.isRequired,
  updateSprint: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  sprint: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  sprint: state.sprint.sprint,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getSprint,
  updateSprint,
  clearErrors,
})(UpdateSprint);
