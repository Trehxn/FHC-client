import { useParams, Link } from "react-router-dom";

import requireAuth from "../hoc/requireAuth";
import Comments from "./Comments";
import useAxios from "../hooks/useAxios";

const Post = () => {
  const { postId } = useParams();

  const { loading, data, error, fetched } = useAxios(
    {
      url: `posts/${postId}`,
    },
    true
  );
  console.log(data);

  if (!fetched || loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) console.log(error);

  return (
    <div className="post">
      <div className="time-line-box">
        <img
          className="user-image"
          src="https://via.placeholder.com/600/771796"
          alt="user"
        ></img>
        <div className="post-box">
          <div className="user-name">{data.username}</div>
          <div className="post-description">{data.content}</div>
        </div>
      </div>
      <Comments postId={postId} />
      <Link to={`/newcomment/${postId}`} className="btn btn-white">
        Add Comment
      </Link>
    </div>
  );
};

export default Post;
