import React, { useEffect, useState } from "react";
import "./Activity.css";
const Activity = ({ categoryData }) => {
  const [activityData, setActivityData] = useState([]);
  useEffect(() => {
    if (categoryData) {
      const activities = categoryData.activityTypes.map((activity) => {
        return {
          name: activity.activityName,
          tasks: activity.Tasks.map((task) => task.taskName),
        };
      });
      setActivityData(activities);
    }
  }, [categoryData]);
  if (!categoryData) {
    return <p>Please wait</p>;
  }
  return (
    <>
      <ul className="noBullets">
        {activityData.map((activity, index) => (
          <li key={index}>

            {activity.name}
            <ul className="noBullets">

              {activity.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>{task}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Activity;