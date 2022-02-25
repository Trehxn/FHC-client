import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },
});

export default axiosInstance;
