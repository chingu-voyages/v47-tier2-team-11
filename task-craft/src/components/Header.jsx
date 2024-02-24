import logo from "../assets/logo.png";
import "./Header.css";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";

const Header = ({ data, handleSetData, handleResetData, resetMessage }) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const handleCloseModal = () => {
    setShowAddTaskModal(false);
  };
  return (
    <>
      <div className="header">
        <img className="header-logo" src={logo} alt="logo" />
        <h1>Task Craft</h1>
        <button
          title="Add Task"
          className="header-button"
          onClick={() => setShowAddTaskModal(true)}
        >
          <i className="fas fa-plus icon"></i>
        </button>
        {showAddTaskModal && (
          <AddTaskModal
            handleCloseModal={handleCloseModal}
            data={data}
            handleSetData={handleSetData}
          />
        )}
        <button
          title="Reset Tasks"
          className="header-button"
          onClick={handleResetData}
        >
          <i className="fas fa-recycle icon"></i>
        </button>
        {resetMessage && <div style={{ color: "red" }}>{resetMessage}</div>}
      </div>
    </>
  );
};

export default Header;
