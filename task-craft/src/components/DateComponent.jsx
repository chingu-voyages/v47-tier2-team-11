import React, { useState, useEffect } from "react";
import "./DateComponent.css";
/* Generates the dates and days for the current month and sets the state with the result.
@param {object} data - input data for the component
@return {JSX.Element} the rendered DateComponent */
export default function DateComponent() {
  const [datesAndDays, setDatesAndDays] = useState([]);
  const [monthAndYear, setMonthAndYear] = useState("");
  /**
   * Generates dates and days for the current month and sets the result.
   */
  function generateDateAndDays() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 to get the current month number (0-indexed)
    const currentYear = currentDate.getFullYear();
    setMonthAndYear(
      `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${currentYear}`
    );
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Getting the number of days in the current month
    const datesAndDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth - 1, i); // Creating date for each day of the month
      const dayOfWeek = date.toLocaleDateString("default", {
        weekday: "narrow",
      }); // Getting the day of the week for the date
      const dayOfMonth = date.getDate(); // Getting the day of the month
      datesAndDays.push({ date, dayOfWeek, dayOfMonth });
    }
    setDatesAndDays(datesAndDays);
  }
  useEffect(() => {
    generateDateAndDays();
  }, []);

  return (
    <div className="date-component-container">
      <h1>{monthAndYear}</h1>
      <div className="date-row">
        {datesAndDays.map((item, index) => (
          <div key={index} className="date-column">
            <div>{item.dayOfWeek}</div>
            <div>{item.dayOfMonth}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
