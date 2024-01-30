import React, { useEffect, useState } from "react";
import "./Activity.css";
const Activity = ({ categoryData }) => {
  const [activityNames, setActivityNames] = useState([]);

  useEffect(() => {
    if (categoryData) {
      const names = categoryData.activityTypes.map(
        (activity) => activity.activityName
      );
      setActivityNames(names);
    }
  }, [categoryData]);

  if (!categoryData) {
    return <p>Please wait</p>;
  }

  return (
    <>
      <ul className="noBullets">
        {activityNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default Activity;
