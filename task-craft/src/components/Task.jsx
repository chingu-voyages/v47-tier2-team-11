import React from "react";
import { useEffect, useState } from "react";
import { isSameDay } from "date-fns";
import TaskCard from "./TaskCard";
import CommentModal from "./CommentModal";
import "./Task.css";
import setOccurrences from "./Occurrences";

const Task = ({ storedData, tasks, datesAndDays }) => {
  const [taskState, setTaskState] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (tasks) {
      tasks.forEach((task) => {
        task.repetition
          ? (task["occurrences"] = setOccurrences(task.day))
          : null;
      });
      setTaskState(tasks);
    }
  }, [tasks]);

  const handleRepetitionTaskStatusChange = (occurrence) => {
    if (occurrence.status === false) {
      occurrence.comment = "";
      setSelectedTask(occurrence);
      setShowModal(true);
    }

    const updatedTasks = taskState.map((task) => ({
      ...task,
      occurrences: task.occurrences.map((o) =>
        o.date === occurrence.date ? { ...o, status: !o.status } : o
      ),
    }));
    setTaskState(updatedTasks);
  };

  const handleNotRepetitionTaskStatusChange = (task) => {
    if (task.status === false) {
      task.comment = "";
      setSelectedTask(task);
      setShowModal(true);
    }
    const updatedTasks = taskState.map((storedTask) =>
      storedTask.id === task.id
        ? { ...storedTask, status: !task.status }
        : storedTask
    );
    setTaskState(updatedTasks);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveComment = (task) => {
    if (task && task.comment !== "") {
      // Only set comment if it exists
      const updatedTasks = taskState.map((task) => ({
        ...task,
        occurrences: task.occurrences.map((o) =>
          o.date === task.date ? { ...o, comment: task.comment } : o
        ),
      }));
      setTaskState(updatedTasks);
    }
    setShowModal(false);
  };

  const handleTaskDelete = (task) => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete the task "${task.taskName}"?`
    );
    if (shouldDelete) {
      const updatedTasks = taskState.filter(
        (storedTask) => storedTask.id !== task.id
      );
      setTaskState(updatedTasks);
    }
  };

  return (
    <>
      {taskState &&
        taskState.map((task) => (
          <tr key={task.id}>
            <td>
              {task.taskName}
              <button
                className="delete-button"
                title="Delete Task"
                onClick={() => handleTaskDelete(task)}
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </td>
            {datesAndDays.map((date, dayIndex) => (
              <td key={`${task.id}-${dayIndex}`}>
                {task.occurrences ? (
                  task.occurrences.map((occurrence) => {
                    return isSameDay(occurrence.date, date.date) ? (
                      <TaskCard
                        key={`${task.id}-${occurrence.date}`}
                        taskName={task.taskName}
                        data={occurrence}
                        handleTaskStatusChange={
                          handleRepetitionTaskStatusChange
                        }
                      />
                    ) : null;
                  })
                ) : isSameDay(task.date, date.date) ? (
                  <TaskCard
                    key={`${task.id}-${date.date}`}
                    taskName={task.taskName}
                    data={task}
                    handleTaskStatusChange={handleNotRepetitionTaskStatusChange}
                  />
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      {showModal && (
        <CommentModal
          show={showModal}
          selectedTask={selectedTask}
          handleCloseModal={handleCloseModal}
          handleSaveComment={handleSaveComment}
        />
      )}
    </>
  );
};

export default Task;
