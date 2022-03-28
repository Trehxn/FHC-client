import { Link } from "react-router-dom";

const Content = () => {
  return (
    <div className="text-box">
      <div className="heading-primary">
        <span className="heading-primary-main">FHC</span>
        <span className="heading-primary-sub">Financial Health Calculator</span>
      </div>
      <Link to="/timeline" className="btn btn-white btn-animated">
        Lets Go!
      </Link>
    </div>
  );
};

export default Content;
