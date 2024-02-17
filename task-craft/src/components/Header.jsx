import logo from "../assets/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <img className="header-logo" src={logo} alt="logo" />
        <h1>Task Craft</h1>
        <button title="Add Task" className="header-button">
          <i className="fas fa-plus icon"></i>
        </button>
        <button title="Reset Tasks" className="header-button">
          <i class="fas fa-recycle icon"></i>
        </button>
      </div>
    </>
  );
};

export default Header;
