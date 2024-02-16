import React from "react";
import Task from "./Task";

const Activity = ({
  storedData,
  activityData,
  datesAndDays,
  handleActivityDelete,
}) => {
  return (
    <>
      <React.Fragment key={activityData.id}>
        <tr>
          <td
            colSpan="31"
            style={{
              backgroundColor: "#00473e",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "3px 5px",
            }}
          >
            {activityData.activityName}
            <button
              className="category-delete-button"
              onClick={() => handleActivityDelete(activityData)}
            >
              <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        <Task
          storedData={storedData}
          tasks={activityData.tasks}
          datesAndDays={datesAndDays}
        />
      </React.Fragment>
    </>
  );
};

export default Activity;
