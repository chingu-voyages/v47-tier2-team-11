import React, { useState } from "react";
import Modal from "react-modal"; // using react modal
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "./TaskDetail.css";

// styling for modal layout
const basicStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "auto",
    borderRadius: "14px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    border: "2px solid #533e3e",
    backgroundColor: "#aabebc", // Modal background color
    padding: "20px",
    color: "black",
    maxWidth: "500px",
    width: "95%",
    maxHeight: "95%",
    overflowY: "auto",
  },
};

const TaskDetail = ({
  task: initialData,
  actName: activity,
  catName: category,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [task, setTask] = useState(initialData);
  const [showDateInput, setShowDateInput] = useState(false);
  const [edit, setEdit] = useState(false);
  const [priority, setPriority] = useState(initialData.priority);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    setEdit(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowDateInput(false);
  };

  return (
    <>
      <button className="openModalBtn" onClick={openModal}>
        {task.taskName}
      </button>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Task Details"
        style={basicStyles}
      >
        <div>
          <button className="btn-close btnClose" onClick={closeModal}></button>
          {/* using button close icon from bootstrap */}
          <h2 className="taskDetailHeading">Task Details</h2>

          {/* Conditionally rendering the date input */}
          {modalIsOpen && showDateInput && (
            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          )}
          <br />
          <h3 className="taskName">
            {edit ? ( //this will render input field if in edit mode
              <input
                className="tasknameInputContainer"
                type="text"
                value={task.taskName}
                onChange={(e) => setTask({ ...task, taskName: e.target.value })}
              />
            ) : (
              <>
                {task.taskName}
                <button className="editButton" onClick={handleEdit}>
                  <i className="fas fa-edit"></i>
                </button>
              </>
            )}
          </h3>

          <h5>
            Due Date:{" "}
            {edit ? (
              <select
                className="inputContainer"
                value={task.day}
                onChange={(e) => setTask({ ...task, day: e.target.value })}
              >
                <option value="default"> --repeat on-- </option>
                <option value="daily">Daily</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            ) : (
              <>
                {task.day}
                <button className="editButton repeatBtn" onClick={handleEdit}>
                  <i className="fas fa-sync-alt"></i>
                </button>
              </>
            )}
            {edit ? (
              <input
                className="inputContainer"
                defaultValue={task.date} // Set the default value for the input field
                type="date"
                value={task.date}
                onChange={(e) => setTask({ ...task, day: e.target.value })} // Update the state when the value changes
              />
            ) : (
              <>
                {task.date}
                <button className="editButton" onClick={handleEdit}>
                  <i className="fas fa-edit">Change Date</i>
                </button>
              </>
            )}
          </h5>

          <h5>Category: {category}</h5>
          <h5>Activity: {activity}</h5>
          <h5>
            Priority:{" "}
            {edit ? (
              <select
                className="inputContainer"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="default"> --select priority-- </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            ) : (
              <>
                {priority}
                <button className="editButton" onClick={handleEdit}>
                  <i className="fas fa-edit"></i>
                </button>
              </>
            )}
          </h5>

          <h5>
            Description:{" "}
            {edit ? (
              <input
                type="text"
                className="inputContainer"
                value={task.taskDescription}
                onChange={(e) =>
                  setTask({ ...task, taskDescription: e.target.value })
                }
              />
            ) : (
              <>
                {task.taskDescription}
                <button className="editButton" onClick={handleEdit}>
                  <i className="fas fa-edit"></i>
                </button>
              </>
            )}
            {edit && (
              <button className="saveBtn" onClick={handleSave}>
                Save
              </button>
            )}
          </h5>
        </div>
      </Modal>
    </>
  );
};

export default TaskDetail;
