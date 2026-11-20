import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjects } from "../../actions/projectActions";
import { clearErrors, createSprint } from "../../actions/sprintActions";
import classnames from "classnames";

class AddSprint extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
      projectIdentifier: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getProjects();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newSprint = {
      name: this.state.name,
      goal: this.state.goal,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      projectIdentifier: this.state.projectIdentifier,
    };
    this.props.createSprint(newSprint, this.props.history);
    this.props.clearErrors();
  }

  render() {
    const { projects } = this.props.project;
    const { errors } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            {/* <Link to="sprintDashboard" className="btn btn-light">
              Back to Sprint Dashboard
            </Link> */}
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
            <h4 className="display-4 text-center">Create Sprint Form</h4>
            <hr />
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <select
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.projectIdentifier,
                  })}
                  name="projectIdentifier"
                  value={this.state.projectIdentifier}
                  onChange={this.onChange}
                >
                  <option value="">Select Project Identifier</option>
                  {projects &&
                    projects.map((project) => (
                      <option
                        key={project.projectIdentifier}
                        value={project.projectIdentifier}
                      >
                        {project.projectIdentifier}
                      </option>
                    ))}
                </select>
                {errors.projectIdentifier && (
                  <div className="invalid-feedback">
                    {errors.projectIdentifier}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name,
                  })}
                  placeholder="Sprint Name"
                  name="name"
                  value={this.state.sprintName}
                  onChange={this.onChange}
                ></input>
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Goal"
                  name="goal"
                  value={this.state.goal}
                  onChange={this.onChange}
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

AddSprint.propTypes = {
  getProjects: PropTypes.func.isRequired,
  createSprint: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getProjects,
  createSprint,
  clearErrors,
})(AddSprint);
