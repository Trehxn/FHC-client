import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import TimeLineBox from "./TimeLineBox";
import requireAuth from "../hoc/requireAuth";
import useAxios from "../hooks/useAxios";

const TimeLine = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      console.log({ jwt: user });
      setUser(user);
    } else setUser(null);
  }, []);

  const { loading, data, error, fetched } = useAxios(
    {
      url: "/posts",
    },
    true
  );

  if (!fetched || loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) console.log(error);

  return (
    <>
      <div className="btn-container">
        <Link to="/newpost" className="btn btn-white">
          New Post
        </Link>
      </div>
      <div className="feed">
        <TimeLineBox posts={data} />
      </div>
    </>
  );
};

export default TimeLine;
