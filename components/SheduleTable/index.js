import { ABBREVIATED_WEEK_DAYS, WEEK_DAYS, SHEDULES } from "utils/constants";

export default function SheduleTable({
  courseColors,
  dailyShedule,
  removeCourse,
}) {
  // Função para obter uma cor para um curso
  const getCourseColor = (course) => {
    return courseColors[course] || "bg-gray-100 border-gray-300 text-gray-800";
  };

  return (
    <>
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">
        Horário Semanal
      </h1>
      <div className="bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3 text-center font-medium">Horários</th>
              {ABBREVIATED_WEEK_DAYS.ALL.pt.map((day, index) => (
                <th key={index} className="p-3 text-center font-medium">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SHEDULES.ALL.map((timeDelta, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3 font-medium text-gray-700 border-r border-gray-200">
                  {timeDelta.split("-")[0]}
                </td>
                {WEEK_DAYS.ALL.en.map((day) => (
                  <td
                    key={timeDelta + day}
                    className="p-2 border border-gray-100 align-top h-14"
                  >
                    <div className="flex flex-col gap-1">
                      {dailyShedule[day][timeDelta].length > 0 ? (
                        dailyShedule[day][timeDelta].map((course, idx) => (
                          <div
                            key={idx}
                            onClick={() => removeCourse(course)}
                            className={`px-2 py-1 rounded-md text-xs font-medium border cursor-pointer ${getCourseColor(
                              course,
                            )}`}
                          >
                            {course}
                          </div>
                        ))
                      ) : (
                        <div className="h-full w-full"></div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
