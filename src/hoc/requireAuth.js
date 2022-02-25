import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const requireAuth = (Component) => {
  const ComposedComponent = ({ ...rest }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (token) {
        const user = jwt.decode(token);
        console.log({ jwt: user });
        setUser(user);
      } else {
        navigate("/signin", { replace: true });
      }
    }, []);

    const status = () => {
      if (!user) {
        return null;
      } else {
        return <Component {...rest} />;
      }
    };
    return status();
  };

  return ComposedComponent;
};

export default requireAuth;
