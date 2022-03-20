const INITIAL_STATE = {
  loading: false,
  error: null,
  username: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN_START":
      return {
        ...state,
        loading: true,
        error: null,
        username: null,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        username: action.payload,
      };
    case "SIGN_IN_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
        username: null,
      };
    case "SIGN_OUT":
      return {
        ...state,
        loading: false,
        error: null,
        username: null,
      };
    default:
      return state;
  }
};
