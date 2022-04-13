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

  const { loading, fetched, data, error, callAxios } = useAxios({
    runOnMount: false,
  });

  if (!loading && fetched) navigate(`/timeline/${postId}`);

  if (error) console.log(error);

  return (
    <div id="modal">
      <form
        onSubmit={handleSubmit((data) => {
          setFormData({ ...data, username, postId });
          callAxios({
            url: `http://localhost:5000/comments/${postId}`,
            method: "post",
            data: { ...data, username, postId },
          });
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
