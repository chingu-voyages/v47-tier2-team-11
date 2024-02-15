// ActivityTest.jsx
import React from "react";
import Task from "./Task";

const Activity = ({ storedData, activityData, datesAndDays }) => {

  return (
    <>
      <React.Fragment key={activityData.id}>
        <tr>
          <td colSpan="2" style={{ fontWeight: "bold" }}>
            {activityData.activityName}
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
