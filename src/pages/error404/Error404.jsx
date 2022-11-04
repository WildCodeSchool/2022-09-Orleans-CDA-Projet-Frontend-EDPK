import "./Error404.scss";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="error404">
      <div className="error404-title">Error 404</div>
      <div className="error404-text">
        Sorry the page you are looking for does not exist!
      </div>
      <Link to="/" className="error404-back">
        Go back to home page
      </Link>
    </div>
  );
};

export default Error404;
