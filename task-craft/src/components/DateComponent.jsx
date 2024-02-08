import React from "react";
import "./DateComponent.css";
/* Generates the dates and days for the current month and sets the state with the result.
@param {object} data - input data for the component
@return {JSX.Element} the rendered DateComponent */
export default function DateComponent({ datesAndDays, monthAndYear }) {
  return (
    <>
      <th>{monthAndYear}</th>
      {datesAndDays.map((item, index) => (
        <th key={index} className="date-column">
          <div>{item.dayOfWeek}</div>
          <div>{item.dayOfMonth}</div>
        </th>
      ))}
    </>
  );
}
