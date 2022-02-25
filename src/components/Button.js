import React from "react";
import { Link } from "react-router-dom";

const Button = ({ href }) => {
  // console.log(pathTo)
  return (
    <a className="btn btn-white btn-animated" href={href} type="submit">
      Let's Go!
    </a>
  );
};

export default Button;
