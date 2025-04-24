const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const shedules = {
  M: [
    "07:00-07:50",
    "08:00-08:50",
    "09:00-09:50",
    "10:00-10:50",
    "11:00-11:50",
  ],

  T: [
    "12:00-12:50",
    "13:00-13:50",
    "14:00-14:50",
    "15:00-15:50",
    "16:00-16:50",
    "17:00-17:50",
  ],

  N: [
    "18:00-18:50",
    "18:50-19:40",
    "19:40-20:30",
    "20:30-21:20",
    "21:20-22:10",
    "22:10-23:00",
  ],
};

function parseCode(code) {
  const parseResult = {
    weekDays: [],
    shedules: {},
  };

  const codeValidatorRegex = /[1-7]+[MTN]{1}[1-6]+/;
  const weekDaysFormat = /[1-7]{1,2}[MTN]{1}/;
  const sheduleFormat = /[MTN]{1}[1-6]+/;

  if (!codeValidatorRegex.test(code)) {
    throw "Invalid code";
  }

  const codeTurn = code.match(/[MTN]{1}/)[0];

  code
    .match(weekDaysFormat)[0]
    .split("")
    .slice(0, -1)
    .forEach((element) => {
      day = weekDays[parseInt(element) - 1];
      parseResult.weekDays.push(day);
      parseResult.shedules[day] = [];
    });

  code
    .match(sheduleFormat)[0]
    .split("")
    .slice(1)
    .forEach((element) => {
      for (const chave in parseResult.shedules) {
        parseResult.shedules[chave].push(
          shedules[codeTurn][parseInt(element) - 1],
        );
      }
    });

  return parseResult;
}

module.exports = parseCode;
