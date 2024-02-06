import React, { useState, useEffect } from "react";
import "./DateComponent.css";
import Category from "./Category";

const CombinedComponent = () => {
  const [data, setData] = useState([]);
  const [datesAndDays, setDatesAndDays] = useState([]);
  const [monthAndYear, setMonthAndYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await import("../assets/tasks.json");
      setData(response.default);
    };

    fetchData();
  }, []);

  useEffect(() => {
    generateDateAndDays();
  }, []);

  const generateDateAndDays = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    setMonthAndYear(
      `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${currentYear}`
    );
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();
    const daysToAdd = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;
    const datesAndDays = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(currentYear, currentMonth - 1, i + 1 - daysToAdd);
      const dayOfWeek = date.toLocaleDateString("default", {
        weekday: "narrow",
      });
      const dayOfMonth = date.getDate();
      const isCurrentDay =
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() === currentDate.getDate();
      datesAndDays.push({ date, dayOfWeek, dayOfMonth, isCurrentDay });
    }
    setDatesAndDays(datesAndDays);
  };

  return (
    <div className="date-component-container">
      <h1>Task List</h1>
      <h1>{monthAndYear}</h1>
      <table className="date-table">
        <thead>
          <tr>
            <th></th>
            {datesAndDays.map((day, index) => (
              <th key={index}>{day.dayOfWeek}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((category, index) => (
            <React.Fragment key={index}>
              <tr>
                <td rowSpan="2"><strong>{category.categoryName}</strong></td>
                {category.activityTypes.map((activity, activityIndex) => (
                  <React.Fragment key={`${index}-${activityIndex}`}>
                    <td colSpan="7">{activity.activityName}</td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {category.activityTypes.map((activity, activityIndex) => (
                  <React.Fragment key={`${index}-${activityIndex}`}>
                    {activity.Tasks.map((task, taskIndex) => (
                      <td key={`${index}-${activityIndex}-${taskIndex}`}>{task.taskName}</td>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CombinedComponent;
