import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxios from "../hooks/useAxios";

const SignInPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, fetched, data, error, callAxios } = useAxios({
    runOnMount: false,
  });

  if (loading && !fetched) return <div className="loading">Loading...</div>;

  if (fetched && !loading) {
    localStorage.setItem("token", data.token);
    dispatch({ type: "SIGN_IN_SUCCESS", payload: data?.user?.username });
    navigate("/");
  }

  if (error) dispatch({ type: "SIGN_IN_ERROR", payload: error });

  return (
    <div id="sign-in-page">
      <form
        onSubmit={handleSubmit((data) => {
          callAxios({
            url: "users/username",
            method: "post",
            data: data,
          });
          dispatch({ type: "SIGN_IN_START" });
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
