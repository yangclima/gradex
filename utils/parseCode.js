import { Result } from "postcss";
import { SHEDULES, WEEK_DAYS } from "./constants.js";
import mergeAndConcat from "./mergeAndConcat.js";

export default function parseCode(code) {
  const parseResult = {};

  const codeValidatorRegex = /[1-7]+[MTN]{1}[1-6]+/g;
  const weekDaysFormat = /[1-7]{1,2}[MTN]{1}/;
  const sheduleFormat = /[MTN]{1}[1-6]+/;

  if (!codeValidatorRegex.test(code)) {
    throw "Invalid code";
  }

  const input = code.match(codeValidatorRegex);

  let result = {};

  input.forEach((match) => {
    const codeTurn = match.match(/[MTN]{1}/)[0];

    const currentResult = {};

    match
      .match(weekDaysFormat)[0]
      .split("")
      .slice(0, -1)
      .forEach((element) => {
        currentResult[WEEK_DAYS[parseInt(element)].en] = [];
      });

    match
      .match(sheduleFormat)[0]
      .split("")
      .slice(1)
      .forEach((element) => {
        Object.keys(currentResult).map((day) => {
          currentResult[day].push(SHEDULES[codeTurn][parseInt(element) - 1]);
        });
      });

    result = mergeAndConcat(result, currentResult);
  });

  return result;
}
