// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getSprint } from "../../actions/sprintActions";
// import Backlog from "../ProjectBoard/Backlog";

// function SprintPTBoard(props) {
//   const { s_id } = props.match.params;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getSprint(s_id, props.history));
//   }, [s_id]);

//   const { sprint } = useSelector((state) => state.sprint);
//   const tasks = sprint.tasks || [];
//   return (
//     <div className="container">
//       <Link
//         to={`/addProjectTask/${sprint.projectIdentifier}?sprintSequence=${sprint.sprintSequence}`}
//         className="btn btn-primary  mb-3"
//       >
//         <i className="fa fa-plus-circle"> Create Project Task</i>
//       </Link>
//       <hr />
//       {tasks.length < 1 ? (
//         <div className="alert alert-danger text-center" role="alert">
//           No tasks in this sprint yet.
//         </div>
//       ) : (
//         <Backlog project_tasks={tasks} />
//       )}
//     </div>
//   );
// }
// export default SprintPTBoard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSprint,
  getUnassignedTasks,
  assignTaskToSprint,
} from "../../actions/sprintActions";
import Backlog from "../ProjectBoard/Backlog";

function SprintPTBoard(props) {
  const { s_id } = props.match.params;
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState("");

  const { sprint, unassignedTasks } = useSelector((state) => state.sprint);
  const tasks = sprint.tasks || [];

  useEffect(() => {
    dispatch(getSprint(s_id, props.history));
  }, [s_id]);

  useEffect(() => {
    if (sprint.projectIdentifier) {
      dispatch(getUnassignedTasks(sprint.projectIdentifier));
    }
  }, [sprint.projectIdentifier]);

  const handleAssign = () => {
    console.log("=== ADD CLICKED ===");
    console.log("selectedTask =", selectedTask);
    console.log("s_id =", s_id);
    if (!selectedTask) return;
    dispatch(assignTaskToSprint(selectedTask, s_id));
    setSelectedTask("");
  };

  return (
    <div className="container pt-4">
      <div
        className="d-flex align-items-center mb-3"
        style={{ justifyContent: "space-between" }}
      >
        <button
          className="btn btn-light"
          onClick={() => props.history.push("/sprintDashboard")}
        >
          Back to Sprint Dashboard
        </button>
        <div className="d-flex align-items-center">
          <Link
            to={`/addProjectTask/${sprint.projectIdentifier}?sprintSequence=${sprint.sprintSequence}`}
            className="btn btn-primary mr-2"
          >
            <i className="fa fa-plus-circle"> Create Project Task</i>
          </Link>
          <select
            className="form-control mr-2"
            style={{ maxWidth: "300px" }}
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            disabled={!unassignedTasks || unassignedTasks.length === 0}
          >
            <option value="">
              {unassignedTasks && unassignedTasks.length > 0
                ? "-- Izaberi task --"
                : "Nema nepovezanih taskova"}
            </option>
            {unassignedTasks &&
              unassignedTasks.map((task) => (
                <option key={task.id} value={task.projectSequence}>
                  {task.projectSequence} — {task.summary} (P{task.priority})
                </option>
              ))}
          </select>
          <button
            className="btn btn-success"
            disabled={!selectedTask}
            onClick={handleAssign}
          >
            <i className="fa fa-plus"> Add</i>
          </button>
        </div>
      </div>
      <hr />

      {tasks.length < 1 ? (
        <div className="alert alert-danger text-center" role="alert">
          No tasks in this sprint yet.
        </div>
      ) : (
        <Backlog project_tasks={tasks} />
      )}
    </div>
  );
}

export default SprintPTBoard;
