import { 
  POST_USER,
  GET_ERROR,
  GET_DASHBOARD,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER 
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: [],
  profile: [],
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      }

    case SET_CURRENT_USER:
     return {
       ...state,
       isAuthenticated: action.payload !== null,
       user: [action.payload]
     }

    case GET_DASHBOARD:
      return {
        ...state,
        profile: [action.payload]
      }

    case CLEAR_CURRENT_USER:
     return {
       ...state,
       isAuthenticated: action.payload !== null,
       user: [action.payload]
     }

    case GET_ERROR:
     return {
       ...state,
       error: action.payload
     }

    default:
      return state;
  }
}

export default authReducer;