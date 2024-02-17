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
    maxWidth: "500px", // Adjust the maximum width as needed
    width: "95%",
    maxHeight: "95%", // Set a maximum height for the modal content
    overflowY: "auto", // Enable vertical scrolling if content exceeds maxHeight
  },
};

const TaskDetail = ({
  task: initialData,
  actName: initialActivity,
  catName: initialCategory,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [task, setTask] = useState(initialData);
  const [showDateInput, setShowDateInput] = useState(false);
  const [showRepeatOptions, setShowRepeatOptions] = useState(false); // Declaring the state variable for repeat options
  const [editMode, setEditMode] = useState(false);
  const [priority, setPriority] = useState(initialData.priority); // State for priority
  const [activity, setActivity] = useState(initialActivity);
  const [category, setCategory] = useState(initialCategory);

  const handleTasknameChange = (e) => {
    // setTask({ ...task, taskName: e.target.value });
    setTask({ taskName: e.target.value });
  };

  const handleRepeat = (e) => {
    setTask(e.target.value);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleChangePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setTask({ ...task, taskDescription: e.target.value });
  };

  console.log(task.day);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowDateInput(false);
    setRepeatButton(false);
    setShowRepeatOptions(false);
  };

  const handleTaskDescriptionChange = (event) => {
    console.log(event); // the event can be seen in console [target > value]
    setTask((prevTask) => ({
      ...prevTask,
      taskDescription: event.target.value,
    }));
  };

  const handleChangeDate = () => {
    console.log("YAYYYY!!! Change Date Btn Clicked");
    setShowDateInput(true);
  };

  // const handleRepeat = () => {
  //   console.log("REPEAT BTN is PRESSED");
  //   setShowRepeatOptions(true);
  // };

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
          {/* <div className="buttonContainer">
            {/* <button onClick={handleChangeDate} className="changeDateBtn">
              Change Date
            </button> */}
          {/* <button className="repeatBtn" onClick={handleRepeat}>
              Repeat
            </button>
          </div>  */}
          {/* Conditionally render the date input */}
          {modalIsOpen && showDateInput && (
            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          )}
          {/* {showRepeatOptions && (
            <div>
              {showRepeatOptions && (
                <>
                  <form className="repeatForm">
                    <p>Repeat on</p>
                    <input type="radio" id="daily" name="option" />
                    <label htmlFor="daily">Daily</label>
                    <br />

                    <input type="radio" id="monday" name="option" />
                    <label htmlFor="monday">Every Mon</label>
                    <br />

                    <input type="radio" id="tuesday" name="option" />
                    <label htmlFor="tuesday">Every Tue</label>
                    <br />

                    <input type="radio" id="wednesday" name="option" />
                    <label htmlFor="wednesday">Every Wed</label>
                    <br />

                    <input type="radio" id="thursday" name="option" />
                    <label htmlFor="thursday">Every Thu</label>
                    <br />

                    <input type="radio" id="friday" name="option" />
                    <label htmlFor="friday">Every Fri</label>
                    <br />

                    <input type="radio" id="saturday" name="option" />
                    <label htmlFor="saturday">Every Sat</label>
                    <br />

                    <input type="radio" id="sunday" name="option" />
                    <label htmlFor="sunday">Every Sun</label>
                  </form>
                </>
              )}
            </div>
          )} */}
          <br />
          <h3 className="taskName">
            {editMode ? ( // Render input field if in edit mode
              <input
                className="tasknameInputContainer"
                type="text"
                value={task.taskName}
                onChange={handleTasknameChange}
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
          {/* <h5>
            Due Date:{" "}
            <button className="repeatBtn" onClick={handleRepeat}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <i
                  className="fas fa-sync-alt"
                  style={{ fontSize: "0.75rem" }}
                ></i>
              </div>
            </button>
            {editMode ? ( // Render input field if in edit mode
              <input
                className="inputContainer"
                defaultValue={task.date} // Set the default value for the input field
                type="date"
                value={task.day} // Set the value attribute to maintain the controlled input
                onChange={(e) => setTask({ ...task, day: e.target.value })} // Update the state when the value changes
              />
            ) : (
              <>
                {task.day}
                <button className="editButton" onClick={handleEdit}>
                  <i className="fas fa-edit">Change Date</i>
                </button>
              </>
            )}
          </h5> */}
          <h5>
            Due Date:{" "}
            {editMode ? (
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
                <button class="editButton repeatBtn" onClick={handleEdit}>
                  <i class="fas fa-sync-alt"></i>
                </button>
              </>
            )}
            {/* <button className="repeatBtn" onClick={handleRepeat}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <i
                    className="fas fa-sync-alt"
                    style={{ fontSize: "0.75rem" }}
                  ></i>
                </div>
              </button> */}
            {editMode ? ( // Render input field if in edit mode
              <input
                className="inputContainer"
                defaultValue={task.date} // Set the default value for the input field
                type="date"
                value={task.day} // Set the value attribute to maintain the controlled input
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

          <h5>
            Category: {category}
            {/* Category:{" "}
            {editMode ? ( // Render input field if in edit mode
              <input
                className="inputContainer"
                type="text"
                value={category}
                onChange={handleCategoryChange}
              />
            ) : (
              <>
                {category}
                <button className="editButton" onClick={handleEdit}>
                  <i className="fas fa-edit"></i>
                </button>
              </>
            )} */}
          </h5>
          <h5>
            Activity: {activity}
            {/* Activity:{" "}
            {editMode ? ( // Render input field if in edit mode
              <input
                className="inputContainer"
                type="text"
                value={activity}
                onChange={handleActivityChange}
              />
            ) : (
              <>
                {activity}
                <button className="editButton" onClick={handleEdit}>
                  <i className="fas fa-edit"></i>
                </button>
              </>
            )} */}
          </h5>
          <h5>
            Priority:{" "}
            {editMode ? (
              <select
                className="inputContainer"
                value={priority}
                onChange={handleChangePriority}
              >
                <option value="default"> --select priority-- </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            ) : (
              <>
                {priority}
                <button class="editButton" onClick={handleEdit}>
                  <i class="fas fa-edit"></i>
                </button>
              </>
            )}
          </h5>

          <h5>
            Description:{" "}
            {editMode ? ( // Render input field if in edit mode
              <input
                type="text"
                className="inputContainer"
                value={task.taskDescription}
                onChange={handleChangeDescription}
              />
            ) : (
              <>
                {task.taskDescription}
                <button className="editButton" onClick={handleEdit}>
                  <i className="fas fa-edit"></i>
                </button>
              </>
            )}
            {editMode && ( // Render save button if in edit mode
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
