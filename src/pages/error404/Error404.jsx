import "./Error404.scss";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="error404">
      <div className="error404_title">Error 404</div>
      <div className="error404_text">
        Sorry the page you're searching is not existing !
      </div>
      <Link to="/" className="error404_back">
        Go back to home page
      </Link>
    </div>
  );
};

export default Error404;
