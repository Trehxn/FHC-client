import { useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const TimeLineBox = ({ posts = [] }) => {
  const [deletePost, setDeletePost] = useState(null);
  const username = useSelector((state) => state.auth.username);
  const navigate = useNavigate();

  useAxios({
    method: "delete",
    url: !deletePost ? null : `/posts/${deletePost._id}`,
    data: deletePost,
  });

  return (
    <>
      {posts.map((post) => {
        return (
          <Fragment key={post._id}>
            <div
              onClick={() => {
                navigate(`/timeline/${post._id}`);
              }}
              className="time-line-box"
            >
              <img
                className="user-image"
                alt="img"
                src="https://via.placeholder.com/600/771796"
              ></img>
              <div className="post-box">
                <div className="user-name">{post.username}</div>
                <div className="post-description">{post.content}</div>
                {username === post.username ? (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      setDeletePost(post);
                    }}
                  >
                    Delete Post
                  </button>
                ) : null}
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default TimeLineBox;
