import { useReducer, useEffect } from "react";
import axios from "../axiosInstance";

const INITIAL_STATE = {
  loading: false,
  fetched: false,
  data: [],
  error: null,
};

const axiosReducer = (state, action) => {
  switch (action.type) {
    case "AXIOS_REQUEST_START":
      return {
        ...state,
        loading: true,
        fetched: false,
        data: [],
      };
    case "AXIOS_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        fetched: true,
        data: action.payload,
        error: null,
      };
    case "AXIOS_REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        fetched: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useAxios = ({ modifyData, runOnMount = true, ...rest }) => {
  const [state, dispatch] = useReducer(axiosReducer, INITIAL_STATE);

  const callAxios = async (config = {}) => {
    dispatch({ type: "AXIOS_REQUEST_START" });
    try {
      const response = await axios({ ...rest, ...config });
      dispatch({
        type: "AXIOS_REQUEST_SUCCESS",
        payload: modifyData
          ? modifyData(state.data, response.data)
          : response.data,
      });
    } catch (err) {
      dispatch({
        type: "AXIOS_PROCESS_ERROR",
        payload: err,
      });
      console.log(err);
    }
  };

  useEffect(() => {
    if (!runOnMount) return null;
    callAxios();
  }, [runOnMount]);

  return { ...state, callAxios };
};

export default useAxios;
