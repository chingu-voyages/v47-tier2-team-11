import logo from "../assets/logo.png";
import add from "../assets/save-svgrepo-com.svg";
import save from "../assets/add-circle-svgrepo-com (1).svg";
import reset from "../assets/reset-svgrepo-com.svg";
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
