import { GET_SPRINTS, GET_SPRINT, DELETE_SPRINT } from "../actions/types"

const initialState={
    sprints:[],
    sprint:{}
}

export default function(state=initialState, action){
    switch (action.type) {
        case GET_SPRINTS:
            return{
                ...state,
                sprints:action.payload
            }
        case GET_SPRINT:
            return{
                ...state,
                sprint:action.payload
            }
        case DELETE_SPRINT:
            return{
                ...state,
                sprints:state.sprints.filter((sprint)=>sprint.sprintSequence!==action.payload)
            }
        default:
            return state
    }
}

