import React, { useEffect, useState } from "react";
import Task from "./Task"; 

const Activity = ({ categoryData }) => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    if (categoryData) {
      const activities = categoryData.activityTypes.map((activity) => {
        return {
          name: activity.activityName,
          tasks: activity.Tasks,
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
            <Task tasks={activity.tasks} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Activity;
