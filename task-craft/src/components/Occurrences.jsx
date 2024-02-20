import {
  nextMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  nextSaturday,
  nextSunday,
  startOfDay,
  startOfMonth,
  lastDayOfMonth,
  addWeeks,
  addDays,
} from "date-fns";

const setOccurrences = (occurrenceDay) => {
  const currentDate = new Date();
  const startDateOfMonth = startOfMonth(currentDate);
  const lastDateOfMonth = lastDayOfMonth(currentDate);
  let date = currentDate;
  let startDate = startDateOfMonth;
  let lastDate = lastDateOfMonth;
  let occurrences = [];
  const nextDayFunctions = {
    monday: nextMonday,
    tuesday: nextTuesday,
    wednesday: nextWednesday,
    thursday: nextThursday,
    friday: nextFriday,
    saturday: nextSaturday,
    sunday: nextSunday,
  };
  switch (occurrenceDay) {
    case "daily":
      for (let i = startDate; i <= lastDate; i = addDays(i, 1)) {
        occurrences.push({ date: i, status: false });
        startDate = addDays(i, 1);
        date = addDays(date, 1);
      }
      break;
    default:
      const nextDayFunction = nextDayFunctions[occurrenceDay.toLowerCase()];

      for (let i = startDate; i < lastDate; i = addWeeks(i, 1)) {
        let nextTaskDate = startOfDay(nextDayFunction(i));
        occurrences.push({ date: nextTaskDate, status: false });
        startDate = nextTaskDate;
        date = addWeeks(date, 1);
      }

      break;
  }
  return occurrences;
};

export default setOccurrences;
