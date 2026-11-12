import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogActions";
import classnames from "classnames";

class UpdateProjectTask extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      summary: "",
      acceptanceCriteria: "",
      dueDate: "",
      priority: "",
      status: "",
      projectIdentifier: "",
      projectSequence: "",
      create_At: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { backlog_id } = this.props.match.params;
    const { pt_id } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      summary,
      acceptanceCriteria,
      dueDate,
      priority,
      status,
      projectIdentifier,
      projectSequence,
      create_At,
    } = nextProps.project_task;

    this.setState({
      id,
      summary,
      acceptanceCriteria,
      dueDate,
      priority,
      status,
      projectIdentifier,
      projectSequence,
      create_At,
    });
  }

  onChange(e) {
    return this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedTask = {
      id: this.state.id,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      dueDate: this.state.dueDate,
      priority: this.state.priority,
      status: this.state.status,
      projectIdentifier: this.state.projectIdentifier,
      projectSequence: this.state.projectSequence,
      create_At: this.state.create_At,
    };
    console.log(updatedTask);
    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      updatedTask,
      this.props.history
    );
  }

  render() {
    const { backlog_id } = this.props.match.params;
    const { errors } = this.state;
    return (
      <div className="add-PIB">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${backlog_id}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                Project ID: {this.state.projectIdentifier} + Project Task ID:{" "}
                {this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    placeholder="Project Task Summary"
                    value={this.state.summary}
                    name="summary"
                    onChange={this.onChange}
                  ></input>

                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Acceptance criteria"
                    value={this.state.acceptanceCriteria}
                    name="acceptanceCriteria"
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={this.state.dueDate}
                    name="dueDate"
                    onChange={this.onChange}
                  ></input>
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    value={this.state.priority}
                    name="priority"
                    onChange={this.onChange}
                  >
                    <option value={0}>Select priority</option>
                    <option value={1}>HIGH</option>
                    <option value={2}>MEDIUM</option>
                    <option value={3}>LOW</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    value={this.state.status}
                    name="status"
                    onChange={this.onChange}
                  >
                    <option value="">Select status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
