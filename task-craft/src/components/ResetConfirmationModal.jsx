import { useState } from "react";

const ResetConfirmationModal = ({ setShowModal, handleResetData }) => {
  const [confirmation, setConfirmation] = useState("");

  const handleResetConfirmation = () => {
    if (confirmation.toLowerCase() === "reset") {
      handleResetData();
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setConfirmation("");
    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="reset-warning" style={{ color: "red" }}>
          Warning: Resetting will clear all data and revert to the start of this
          session.
        </p>
        <label>
          To confirm, type "reset" in the box below and click Reset:
        </label>
        <input
          type="text"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          placeholder="Type here..."
        />
        <div>
          <button className="reset-button" onClick={handleResetConfirmation}>
            Reset
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmationModal;
