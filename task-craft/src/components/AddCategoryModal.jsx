import { useState } from "react";

const AddCategoryModal = ({ setShowModal, handleAddNewCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSaveCategory = () => {
    if (newCategoryName.trim() !== "") {
      handleAddNewCategory(newCategoryName.trim());
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setNewCategoryName("");
    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <label>Add New Category:</label>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name..."
        />
        <div>
          <button className="save-button" onClick={handleSaveCategory}>
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

export default AddCategoryModal;
