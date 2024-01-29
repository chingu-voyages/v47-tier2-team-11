import React, { useState, useEffect } from "react";

/* Generates the dates and days for the current month and sets the state with the result.
@param {object} data - input data for the component
@return {JSX.Element} the rendered DateComponent */
export default function DateComponent() {
  const [datesAndDays, setDatesAndDays] = useState([]);
  const [month, setMonth] = useState([]);
  /**
   * Generates dates and days for the current month and sets the result.
   */
  function generateDateAndDays() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 to get the current month number (0-indexed)
    setMonth(currentDate.toLocaleString("default", { month: "long" }));
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentMonth,
      0
    ).getDate(); // Getting the number of days in the current month
    const datesAndDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentMonth - 1, i); // Creating date for each day of the month
      const dayOfWeek = date.toLocaleDateString("en-US", {
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
    <div>
      <h1>{month}</h1>
      {datesAndDays.map((item, index) => (
        <div key={index}>
          {item.dayOfWeek} - {item.dayOfMonth}
        </div>
      ))}
    </div>
  );
}
