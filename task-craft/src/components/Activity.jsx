import React, { useEffect, useState } from "react";
import Task from "./Task";

const Activity = ({
  storedData,
  handleSetData,
  activityData,
  categoryId,
  datesAndDays,
  handleActivityEdit,
  handleActivityDelete,
  catName,
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
              className="edit-button"
              title="Edit Activity"
              onClick={() => handleActivityEdit(activityData)}
            >
              <i className="far fa-edit"></i>
            </button>
            <button
              className="delete-button"
              title="Delete Activity"
              onClick={() => handleActivityDelete(activityData)}
            >
              <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        {activityData.tasks.map((task) => (
          <Task
            key={task.id}
            storedData={storedData}
            handleSetData={handleSetData}
            categoryId={categoryId}
            activityId={activityData.id}
            task={task}
            datesAndDays={datesAndDays}
            actName={activityData.activityName}
            catName={catName}
          />
        ))}
      </React.Fragment>
    </>
  );
};

export default Activity;
