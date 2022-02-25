import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import requireAuth from "../hoc/requireAuth";
import useAxios from "../hooks/useAxios";
const NewPostModal = () => {
  const [formData, setFormData] = useState(null);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const username = useSelector((state) =>
    state.auth ? state.auth.username : null
  );

  const { loading, error, fetched, callAxios } = useAxios(
    {
      method: "post",
      url: "http://localhost:5000/posts",
      data: formData,
    },
    false
  );

  if (!loading && fetched) navigate("/timeline");

  if (error) console.log(error);

  return (
    <div id="modal">
      <form
        onSubmit={handleSubmit(async (data) => {
          setFormData({ ...data, username });
          callAxios();
        })}
      >
        <Link to="/timeline" className="close-button">
          X
        </Link>
        <input
          {...register("content", { required: true })}
          autoComplete="off"
          className="input"
          placeholder="What's on your mind..."
        />
        <button className="btn">Post</button>
      </form>
    </div>
  );
};

export default NewPostModal;
