import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import GoogleAuth from "./GoogleAuth";

const MenuItem = () => {
  const username = useSelector((state) => state.auth?.username);
  const dispatch = useDispatch();

  console.log(`username is ${username}`);

  useEffect(() => {
    const token = localStorage.getItem("token");
  });

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
          <button
            onClick={() => {
              localStorage.clear();
            }}
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
