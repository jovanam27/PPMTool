import {
  GET_SPRINT,
  GET_SPRINTS,
  DELETE_SPRINT,
  GET_ERRORS,
  GET_UNASSIGNED_TASKS,
} from "./types";
import axios from "axios";

export const createSprint = (sprint, history) => async (dispatch) => {
  try {
    await axios.post("/api/sprint", sprint);
    history.push("/sprintDashboard");
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: {},
    // });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getSprints = () => async (dispatch) => {
  const res = await axios.get("/api/sprint/all");
  dispatch({
    type: GET_SPRINTS,
    payload: res.data,
  });
};

export const getSprint = (s_id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/sprint/${s_id}`);
    dispatch({
      type: GET_SPRINT,
      payload: res.data,
    });
  } catch (err) {
    history.push("/sprintDashboard");
  }
};

export const deleteSprint = (s_id) => async (dispatch) => {
  if (window.confirm("Are you sure? This will delete the sprint.")) {
    await axios.delete(`/api/sprint/${s_id}`);
    dispatch({
      type: DELETE_SPRINT,
      payload: s_id,
    });
  }
};

export const updateSprint = (s_id, sprint, history) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/sprint/${s_id}`, sprint);
    history.push("/sprintDashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
};

export const getUnassignedTasks = (projectIdentifier) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/backlog/tasks/unassignedTasks/${projectIdentifier}`
    );
    dispatch({
      type: GET_UNASSIGNED_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// export const assignTaskToSprint =
//   (projectSequence, sprintSequence) => async (dispatch) => {
//     try {
//       await axios.patch(
//         `/api/backlog/assign/${sprintSequence}/${projectSequence}`
//       );
//       dispatch(getSprint(sprintSequence));
//       // Osvezi listu nepovezanih taskova (combobox)
//       const projectIdentifier = getState().sprint.sprint.projectIdentifier;
//       if (projectIdentifier) {
//         await dispatch(getUnassignedTasks(projectIdentifier));
//       }
//     } catch (err) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       });
//     }
//   };

export const assignTaskToSprint =
  (projectSequence, sprintSequence) => async (dispatch, getState) => {
    try {
      await axios.patch(
        `/api/backlog/assign/${sprintSequence}/${projectSequence}`
      );

      // Osveži sprint
      await dispatch(getSprint(sprintSequence));

      // Izvuci projectIdentifier iz Redux state-a
      const projectIdentifier = getState().sprint.sprint.projectIdentifier;

      // Osveži listu nepovezanih taskova
      if (projectIdentifier) {
        await dispatch(getUnassignedTasks(projectIdentifier));
      }
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : { message: err.message },
      });
    }
  };
