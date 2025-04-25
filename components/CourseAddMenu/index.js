import { useState } from "react";
import { TIME_OPTIONS, WEEK_DAYS } from "utils/constants";
import parseCode from "utils/parseCode";

export default function AddCourseMenu({ addCourse }) {
  const [newCourse, setNewCourse] = useState({
    name: "",
    selectedDays: [],
    startTime: "08:00",
    endTime: "09:50",
    code: "",
  });
  const [addType, toggleAddType] = useState(true);

  const handleDaySelect = (day) => {
    if (newCourse.selectedDays.includes(day)) {
      setNewCourse({
        ...newCourse,
        selectedDays: newCourse.selectedDays.filter((d) => d !== day),
      });
    } else {
      setNewCourse({
        ...newCourse,
        selectedDays: [...newCourse.selectedDays, day],
      });
    }
  };

  return (
    <>
      <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Adicionar Disciplina</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Nome da Disciplina
          </label>
          <input
            type="text"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Ex: Cálculo 1"
          />
        </div>

        <div className={addType ? "hidden" : ""}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Dias da Semana
            </label>
            <div className="grid grid-cols-7 gap-1">
              {WEEK_DAYS.ALL.en.map((day) => (
                <button
                  key={day}
                  className={`p-1 text-xs rounded ${
                    newCourse.selectedDays.includes(day)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleDaySelect(day)}
                >
                  {day.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Hora Início
              </label>
              <select
                value={newCourse.startTime}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, startTime: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                {TIME_OPTIONS.FROM.map((time) => (
                  <option key={`start-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora Fim</label>
              <select
                value={newCourse.endTime}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, endTime: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                {TIME_OPTIONS.TO.map((time) => (
                  <option key={`end-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={addType ? "" : "hidden"}>
          <label className="block text-sm font-medium mb-1">
            Código de horário
          </label>
          <input
            type="text"
            value={newCourse.code}
            onChange={(e) =>
              setNewCourse({ ...newCourse, code: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Ex: 2T45"
          />
        </div>

        <button
          onClick={() => {
            let courseContent = {};
            if (!addType) {
              const fromIndex = TIME_OPTIONS.FROM.indexOf(newCourse.startTime);
              const toIndex = TIME_OPTIONS.TO.indexOf(newCourse.endTime);
              const courseTimeDelta = TIME_OPTIONS.FROM_TO.slice(
                fromIndex,
                toIndex + 1,
              );
              newCourse.selectedDays.map((day) => {
                courseContent[day] = courseTimeDelta;
              });
            } else {
              courseContent = parseCode(newCourse.code);
            }

            addCourse(newCourse.name, courseContent);
          }}
          className="mt-3 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Adicionar Disciplina
        </button>
        <button
          onClick={() => {
            toggleAddType(!addType);
          }}
          className="w-full bg-blue-300 text-white p-2 rounded hover:bg-blue-400 mt-3"
        >
          {addType ? "Usar propriedades" : "Usar código"}
        </button>

        {/* <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">
            Disciplinas Cadastradas
          </h3>
          <ul className="space-y-1">
            {Object.keys(courses).map((courseName) => (
              <li
                key={courseName}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 ${getColorForCourse(courseName)} rounded-full mr-2`}
                  ></div>
                  <span>{courseName}</span>
                </div>
                <button
                  onClick={() => removeCourse(courseName)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
}
