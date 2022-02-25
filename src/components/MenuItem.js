import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

import GoogleAuth from "./GoogleAuth";

const MenuItem = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      console.log({ jwt: user });
      setUser(user);
    } else setUser(null);
  }, []);

  return (
    <>
      <Link to="/" className="header-button">
        Home
      </Link>
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
      <Link to="/signin" className="header-button float-right">
        Sign In
      </Link>
      <Link to="/signup" className="header-button float-right">
        Sign Up
      </Link>
      {/* <GoogleAuth /> */}
    </>
  );
};

export default MenuItem;
