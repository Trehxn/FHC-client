import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import signedIn from "../hoc/signedIn";
import useAxios from "../hooks/useAxios";

const SignUpPage = () => {
  const [formData, setFormData] = useState(null);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const { loading, fetched, error } = useAxios({
    method: "post",
    url: !formData ? null : "http://localhost:5000/users",
    data: formData,
  });

  if (!loading && fetched) navigate("/signin");

  if (error) console.log(error);

  return (
    <div id="sign-in-page">
      <form
        onSubmit={handleSubmit((data) => {
          setFormData(data);
        })}
      >
        <h1 className="heading">Sign Up</h1>
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
          <i className="fas fa-envelope-open"></i>
          <input
            {...register("email", { required: true })}
            autoComplete="off"
            className="input"
            placeholder="Email"
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
        <button className="btn btn-white btn-animated">Create Account</button>
      </form>
    </div>
  );
};

export default signedIn(SignUpPage);
