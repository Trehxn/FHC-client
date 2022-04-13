import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import GoogleAuth from "./GoogleAuth";
import jwt from "jsonwebtoken";

const MenuItem = () => {
  const [user, setUser] = useState({});
  const username = useSelector((state) => state.auth?.username);
  const dispatch = useDispatch;

  const token = localStorage.getItem("token");
  const jwtUser = jwt.decode(token);
  console.log(user);

  // useEffect(() => {
  //   setUser(jwtUser);
  // }, [token]);

  // if (user?.username) {
  //   console.log("tried signing in");
  //   dispatch({ type: "SIGN_IN_SUCCESS", payload: user.username });
  // }
  const onSignOut = () => {
    localStorage.clear();
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <>
      <Link to="/" className="header-button">
        Home
      </Link>
      {username ? (
        <>
          <Link to="/timeline" className="header-button">
            Timeline
          </Link>
          <Link to="/chatbox" className="header-button">
            ChatBox
          </Link>
          <Link to="/livechat" className="header-button">
            Live Chat
          </Link>
          <button
            onClick={() => onSignOut}
            className="btn header-button float-right"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link to="/signin" className="header-button float-right">
            Sign In
          </Link>
          <Link to="/signup" className="header-button float-right">
            Sign Up
          </Link>
        </>
      )}

      {/* <GoogleAuth /> */}
    </>
  );
};

export default MenuItem;
