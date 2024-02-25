// AddActivityModal.jsx
import { useState } from "react";

const AddActivityModal = ({ setShowModal, handleAddNewActivity }) => {
  const [newActivityName, setNewActivityName] = useState("");

  const handleSaveActivity = () => {
    if (newActivityName.trim() !== "") {
      handleAddNewActivity(newActivityName.trim());
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setNewActivityName("");
    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>Add New Activity:</label>
        <input
          type="text"
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
          placeholder="Enter activity name..."
        />
        <div>
          <button className="save-button" onClick={handleSaveActivity}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
