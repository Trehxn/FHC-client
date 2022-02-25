const INITIAL_STATE = {
  loading: false,
  isSignedIn: false,
  error: null,
  isDetermined: false,
  username: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN_START":
      return {
        ...state,
        loading: true,
        isSignedIn: false,
        isDetermined: false,
        error: null,
        username: null,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        isSignedIn: true,
        loading: false,
        isDetermined: true,
        error: null,
        username: action.payload,
      };
    case "SIGN_IN_ERROR":
      return {
        ...state,
        isSignedIn: false,
        error: action.payload,
        loading: false,
        isDetermined: false,
        username: null,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        loading: false,
        isDetermined: true,
        error: null,
        username: null,
      };
    default:
      return state;
  }
};
