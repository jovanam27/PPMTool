import {
  GET_SPRINTS,
  GET_SPRINT,
  DELETE_SPRINT,
  DELETE_PROJECT_TASK,
  GET_UNASSIGNED_TASKS,
} from "../actions/types";

const initialState = {
  sprints: [],
  sprint: {},
  unassignedTasks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPRINTS:
      return {
        ...state,
        sprints: action.payload,
      };
    case GET_SPRINT:
      return {
        ...state,
        sprint: action.payload,
      };
    case DELETE_SPRINT:
      return {
        ...state,
        sprints: state.sprints.filter(
          (sprint) => sprint.sprintSequence !== action.payload
        ),
      };
    case DELETE_PROJECT_TASK:
      return {
        ...state,
        sprint: {
          ...state.sprint,
          tasks: (state.sprint.tasks || []).filter(
            (task) => task.projectSequence !== action.payload
          ),
        },
      };
    case GET_UNASSIGNED_TASKS:
      return {
        ...state,
        unassignedTasks: action.payload,
      };
    default:
      return state;
  }
}
