import logo from "../assets/logo.png";
import "./Header.css";
import AddTaskModal from "./AddTaskModal";
import ResetConfirmationModal from "./ResetConfirmationModal";
import { useState } from "react";

const Header = ({ data, handleSetData, handleResetData, resetMessage }) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showResetConfirmationModal, setShowResetConfirmationModal] =
    useState(false);

  const handleCloseModal = () => {
    setShowAddTaskModal(false);
  };

  const handleOpenResetConfirmationModal = () => {
    setShowResetConfirmationModal(true);
  };

  const handleCloseResetConfirmationModal = () => {
    setShowResetConfirmationModal(false);
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
          onClick={handleOpenResetConfirmationModal}
        >
          <i className="fas fa-recycle icon"></i>
        </button>
        {showResetConfirmationModal && (
          <ResetConfirmationModal
            setShowModal={handleCloseResetConfirmationModal}
            handleResetData={handleResetData}
          />
        )}
        {resetMessage && <div style={{ color: "red" }}>{resetMessage}</div>}
      </div>
    </>
  );
};

export default Header;
