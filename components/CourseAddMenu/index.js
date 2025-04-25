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
  const [addType, setAddType] = useState(true);
  const [formError, setFormError] = useState("");

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

  const handleSubmit = () => {
    // Form validation
    if (!newCourse.name.trim()) {
      setFormError("O nome da disciplina é obrigatório");
      return;
    }

    if (addType && !newCourse.code.trim()) {
      setFormError("O código de horário é obrigatório");
      return;
    }

    if (!addType && newCourse.selectedDays.length === 0) {
      setFormError("Selecione pelo menos um dia da semana");
      return;
    }

    setFormError("");

    let courseContent = {};
    if (!addType) {
      const fromIndex = TIME_OPTIONS.FROM.indexOf(newCourse.startTime);
      const toIndex = TIME_OPTIONS.TO.indexOf(newCourse.endTime);
      const courseTimeDelta = TIME_OPTIONS.FROM_TO.slice(
        fromIndex,
        toIndex + 1,
      );
      newCourse.selectedDays.forEach((day) => {
        courseContent[day] = courseTimeDelta;
      });
    } else {
      courseContent = parseCode(newCourse.code);
    }

    addCourse(newCourse.name, courseContent);

    // Reset form
    setNewCourse({
      name: "",
      selectedDays: [],
      startTime: "08:00",
      endTime: "09:50",
      code: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
        <span className="text-indigo-600 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </span>
        Adicionar Disciplina
      </h2>

      {formError && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {formError}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome da Disciplina
        </label>
        <input
          type="text"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          placeholder="Ex: Cálculo 1"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => setAddType(true)}
            className={`py-2 px-4 rounded-lg transition-all ${
              addType
                ? "bg-indigo-600 text-white font-medium"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Código
          </button>
          <button
            onClick={() => setAddType(false)}
            className={`py-2 px-4 rounded-lg transition-all ${
              !addType
                ? "bg-indigo-600 text-white font-medium"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Propriedades
          </button>
        </div>
      </div>

      <div className={`transition-all ${addType ? "hidden" : "block"}`}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dias da Semana
          </label>
          <div className="grid grid-cols-7 gap-1">
            {WEEK_DAYS.ALL.en.map((day) => (
              <button
                key={day}
                className={`p-2 text-xs font-medium rounded-md transition-all ${
                  newCourse.selectedDays.includes(day)
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleDaySelect(day)}
              >
                {day.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora Início
            </label>
            <select
              value={newCourse.startTime}
              onChange={(e) =>
                setNewCourse({ ...newCourse, startTime: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              {TIME_OPTIONS.FROM.map((time) => (
                <option key={`start-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora Fim
            </label>
            <select
              value={newCourse.endTime}
              onChange={(e) =>
                setNewCourse({ ...newCourse, endTime: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
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

      <div className={`mb-4 ${addType ? "block" : "hidden"}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Código de horário
        </label>
        <input
          type="text"
          value={newCourse.code}
          onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          placeholder="Ex: 2T45"
        />
        <p className="mt-1 text-xs text-gray-500">
          Formato: número do dia + turno (M/T/N) + horários
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-sm"
      >
        Adicionar Disciplina
      </button>
    </div>
  );
}
