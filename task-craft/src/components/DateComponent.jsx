import React, { useState, useEffect } from "react";
import Category from "./Category";
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
  }

  useEffect(() => {
    generateDateAndDays();
  }, []);

  return (
    <div className="date-component-container">
      
      <table className="date-table">
        <thead>
        <td><h1>taskl list</h1></td>
        <td><h1>{monthAndYear}</h1></td>
        </thead>
        <thead>
          <tr>
            <td>category</td>
            <td>{datesAndDays[0]?.dayOfWeek}</td>
            <td>{datesAndDays[1]?.dayOfWeek}</td>
            <td>{datesAndDays[2]?.dayOfWeek}</td>
            <td>{datesAndDays[3]?.dayOfWeek}</td>
            <td>{datesAndDays[4]?.dayOfWeek}</td>
            <td>{datesAndDays[5]?.dayOfWeek}</td>
            <td>{datesAndDays[6]?.dayOfWeek}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>activity</td>
          <td className={datesAndDays[7]?.isCurrentDay ? "current-day" : ""}>
              {datesAndDays[7]?.dayOfMonth}
            </td>
            <td className={datesAndDays[8]?.isCurrentDay ? "current-day" : ""}>
              {datesAndDays[8]?.dayOfMonth}
            </td>
            <td className={datesAndDays[9]?.isCurrentDay ? "current-day" : ""}>
              {datesAndDays[9]?.dayOfMonth}
            </td>
            <td className={datesAndDays[10]?.isCurrentDay ? "current-day" : ""}>
              {datesAndDays[10]?.dayOfMonth}
            </td>
            <td className={datesAndDays[11]?.isCurrentDay ? "current-day" : ""}>
              {datesAndDays[11]?.dayOfMonth}
            </td>
            <td className={datesAndDays[12]?.isCurrentDay ? "current-day" : ""}>
              {datesAndDays[12]?.dayOfMonth}
            </td>
            <td className={datesAndDays[13]?.isCurrentDay ? "current-day" : ""}>
              {datesAndDays[13]?.dayOfMonth}
            </td>
          </tr>
          <tr>
            <td>task 1</td>
            <td></td>
            <td></td>
            <td></td>
            <td><button>task1</button></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>laudry</td>
            <td><button>task1</button></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
}