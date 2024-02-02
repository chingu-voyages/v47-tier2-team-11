import React from "react";
import "./Task.css";
const Task = ({ tasks }) => {
  return (
    <ul className="noBullets">
      {tasks.map((task, taskIndex) => (
        <li key={taskIndex}>{task.taskName}</li>
      ))}
    </ul>
  );
};

export default Task;
