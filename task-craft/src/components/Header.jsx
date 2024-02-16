import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import React, { useState } from "react";
import Modal from "react-modal";

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
    width: "60%",
    height: "80%",
    maxHeight: "90vh",
    maxWidth: "90vw",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor:'white'

  },
};

const Header = () => {
  const [addtaskForm, setaddtaskForm] = useState(true);
  const [category, setCategory] = useState("");
  const [activity, setActivity] = useState("");
  const [taskName, setTaskName] = useState("");
  const [occurrence, setOccurrence] = useState("onetime");
  const [priority, setPriority] = useState("Medium");

  const openAddtaskForm = () => {
    setaddtaskForm(true);
    console.log('open has been clicked');
  };

  const closeAddtaskForm = () => {
    setaddtaskForm(false);
    console.log('close has been clicked');
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleOccurrenceChange = (event) => {
    setOccurrence(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('Category:', category);
    console.log('Activity:', activity);
    console.log('Task Name:', taskName);
    console.log('Occurrence:', occurrence);
    console.log('Priority:', priority);
    // Optionally, you can clear the form after submission
    setCategory('');
    setActivity('');
    setTaskName('');
    setOccurrence('onetime');
    setPriority('Medium');
  };

  return (
    <>
      <div className="container">
        <img className="logo" src={logo} />
        <h1 className="head">Task Craft</h1>
        <button onClick={openAddtaskForm} className="buton">
          <FontAwesomeIcon className="icon" icon={faPlus} />
        </button>
        <Modal
          ariaHideApp={false}
          isOpen={addtaskForm}
          contentLabel="Add Task"
          style={basicStyles}
        >
          <div className="modal-content" style={{ maxHeight: '100%' }}>
            <button className="buton" onClick={closeAddtaskForm}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 style={{color:'#00473e'}}>Add Task</h2>
            <form className="input-group" onSubmit={handleSubmit}>
              <label>Enter Category</label>
              <input
                type="text"
                placeholder="category"
                value={category}
                onChange={handleCategoryChange}
              />
              <label>Enter Activity</label>
              <input
                type="text"
                placeholder="Activity"
                value={activity}
                onChange={handleActivityChange}
              />
              <label>Enter task name</label>
              <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={handleTaskNameChange}
              />
              <label>Occurrence</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="occurrence"
                  value="onetime"
                  checked={occurrence === "onetime"}
                  onChange={handleOccurrenceChange}
                />
                <label>Onetime</label>
                <input
                  type="radio"
                  name="occurrence"
                  value="repitational"
                  checked={occurrence === "repitational"}
                  onChange={handleOccurrenceChange}
                />
                <label>Repitational</label>
              </div>
              <label>Priority</label>
              <select value={priority} onChange={handlePriorityChange}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button style={{color:'#00473e',backgroundColor:'#faae2b',border:'none',borderRadius:'10px'}} type="submit">Submit</button>
            </form>
          </div>
        </Modal>
        <button
          onClick={() => {
            alert("feature not available");
          }}
          className="buton"
        >
          <FontAwesomeIcon className="icon" icon={faArrowsRotate} />
        </button>
      </div>
    </>
  );
};

export default Header;
