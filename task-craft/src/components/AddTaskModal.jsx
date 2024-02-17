import "./AddTaskModal.css";

const AddTaskModal = ({ data, handleCloseModal }) => {
  return (
    <div className="task-modal-overlay">
      <div onHide={handleCloseModal} className="task-modal-content">
        <div className="task-modal-header">
          <p>Add New Task</p>
          <button className="task-modal-close" onClick={handleCloseModal}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
