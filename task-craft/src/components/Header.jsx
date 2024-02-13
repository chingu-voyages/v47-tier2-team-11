import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="container">
        <img className="logo" src={logo} />
        <h1 className="head">Task Craft</h1>
        <FontAwesomeIcon className="icon" icon={faPlus} />
        <FontAwesomeIcon className="icon" icon={faArrowsRotate} />
      </div>
    </>
  );
};

export default Header;
