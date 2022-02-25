import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import requireAuth from "../hoc/requireAuth";
import useAxios from "../hooks/useAxios";

const NewCommentPage = () => {
  const [formData, setFormData] = useState(null);

  const { register, handleSubmit } = useForm();
  const { postId } = useParams();
  const username = useSelector((state) =>
    state.auth ? state.auth.username : null
  );
  const navigate = useNavigate();

  const { loading, error, fetched, callAxios } = useAxios(
    {
      method: "post",
      url: !formData ? null : `http://localhost:5000/comments/${postId}`,
      data: formData,
    },
    false
  );

  if (!loading && fetched) navigate(`/timeline/${postId}`);

  if (error) console.log(error);

  return (
    <div id="modal">
      <form
        onSubmit={handleSubmit((data) => {
          setFormData({ ...data, username, postId });
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
          placeholder="Add a new comment..."
        />
        <button className="btn">Post</button>
      </form>
    </div>
  );
};

export default NewCommentPage;
