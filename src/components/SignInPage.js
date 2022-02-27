import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxios from "../hooks/useAxios";
import jwt from "jsonwebtoken";

const SignInPage = () => {
  const [formData, setFormData] = useState(null);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { loading, fetched, data, error, callAxios } = useAxios({
    method: "post",
    url: !formData ? null : "users/username/",
    data: formData,
  });

  if (loading && !fetched) return <div className="loading">Loading...</div>;

  if (fetched && !loading) {
    const user = jwt.decode(token);
    dispatch({ type: "SIGN_IN_SUCCESS", payload: user.username });
    localStorage.setItem("token", data.token);
    navigate("/");
  }

  if (error) dispatch({ type: "SIGN_IN_ERROR", payload: error });

  return (
    <div id="sign-in-page">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch({ type: "SIGN_IN_START" });
          setFormData(data);
          console.log(formData);
        })}
      >
        <h1 className="heading">Sign In</h1>
        <div className="inputs">
          <i className="fas fa-user"></i>
          <input
            {...register("username", { required: true })}
            autoComplete="off"
            className="input"
            placeholder="Username"
          />
        </div>
        <div className="inputs">
          <i className="fas fa-unlock"></i>
          <input
            {...register("password", { required: true })}
            autoComplete="off"
            className="input"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="btn btn-white btn-animated">Log In</button>
      </form>
    </div>
  );
};

export default SignInPage;
