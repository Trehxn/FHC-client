import useAxios from "../hooks/useAxios";

const Comments = ({ postId }) => {
  const { loading, data, error, fetched } = useAxios(
    {
      url: `http://localhost:5000/comments/${postId}`,
    },
    true
  );

  if (!fetched || loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) console.log(error);

  return data.map((data) => {
    return (
      <div key={data._id} className="comment">
        <img
          className="user-image"
          alt="img"
          src="https://via.placeholder.com/600/771796"
        ></img>
        <div className="post-box">
          <div className="user-name">{data.username}</div>
          <div className="post-description">{data.content}</div>
        </div>
      </div>
    );
  });
};

export default Comments;
