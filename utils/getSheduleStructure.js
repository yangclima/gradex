import { SHEDULES, WEEK_DAYS } from "./constants.js";

export default function getSheduleStructure() {
  const result = {};

  WEEK_DAYS.ALL.en.map((day) => {
    result[day] = {};
    SHEDULES.ALL.map((timeDelta) => {
      result[day][timeDelta] = [];
    });
  });

  return result;
}
