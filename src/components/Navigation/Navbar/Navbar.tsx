import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className={classes["menu"]}>
      <ul className={classes["menu-list"]}>
        <li>
          <Link to="/films">
            <FontAwesomeIcon icon={faHome} className={classes["navIcon"]} />
          </Link>
        </li>
        <li>
          <Link to="/customfilm">
            <FontAwesomeIcon icon={faPlus} className={classes["navIcon"]} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
