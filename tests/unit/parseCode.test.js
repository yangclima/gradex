const parseCode = require("../../utils/parseCode.js");

test("parseCode function should parse de class time code correctly", () => {
  expect(parseCode("2T34").weekDays).toEqual(["Monday"]);
  expect(parseCode("2T34").shedules.Monday).toEqual([
    "14:00-14:50",
    "15:00-15:50",
  ]);
  expect(parseCode("26T34").shedules).toEqual({
    Monday: ["14:00-14:50", "15:00-15:50"],
    Friday: ["14:00-14:50", "15:00-15:50"],
  });
});
