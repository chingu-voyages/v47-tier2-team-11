const DeleteModal = ({ setShowDeleteModal, type, name, handleDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p style={{ padding: "0.5em" }}>
          {`Are you sure you want to delete the ${type} "${name}"?`}
        </p>
        <div>
          <button className="save-button" onClick={() => handleDelete()}>
            OK
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
