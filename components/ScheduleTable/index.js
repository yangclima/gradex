import { ABBREVIATED_WEEK_DAYS, WEEK_DAYS, SHEDULES } from "utils/constants";
import { useState, useEffect, useRef } from "react";

export default function ScheduleTable({
  courseColors,
  dailySchedule,
  removeCourse,
}) {
  const [isScrollable, setIsScrollable] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    const checkScrollable = () => {
      if (tableRef.current) {
        setIsScrollable(
          tableRef.current.scrollWidth > tableRef.current.clientWidth,
        );
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  // Função para obter uma cor para um curso
  const getCourseColor = (course) => {
    return courseColors[course] || "bg-gray-100 border-gray-300 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-indigo-600 text-white">
        <h1 className="text-xl font-bold text-center">Horário Semanal</h1>
      </div>

      {isScrollable && (
        <div className="px-4 py-2 text-center text-xs text-gray-500 bg-gray-50 border-b">
          <span>⟺ Deslize horizontalmente para ver todos os dias</span>
        </div>
      )}

      <div className="overflow-x-auto" ref={tableRef}>
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="p-3 text-center font-medium sticky left-0 bg-indigo-100 z-10 border-r border-indigo-200">
                Horários
              </th>
              {ABBREVIATED_WEEK_DAYS.ALL.pt.map((day, index) => (
                <th
                  key={index}
                  className="p-3 text-center font-medium min-w-20"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SHEDULES.ALL.map((timeDelta, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className="p-3 font-medium text-gray-700 border-r border-gray-200 sticky left-0 z-10 bg-inherit">
                  {timeDelta.split("-")[0]}
                </td>
                {WEEK_DAYS.ALL.en.map((day) => (
                  <td
                    key={timeDelta + day}
                    className="p-2 border border-gray-100 align-top h-16 transition-all hover:bg-slate-100"
                  >
                    <div className="flex flex-col gap-1">
                      {dailySchedule[day] &&
                      dailySchedule[day][timeDelta] &&
                      dailySchedule[day][timeDelta].length > 0 ? (
                        dailySchedule[day][timeDelta].map((course, idx) => (
                          <div
                            key={idx}
                            onClick={() => removeCourse(course)}
                            className={`px-2 py-1 rounded-md text-xs font-medium border cursor-pointer transition-transform hover:scale-105 shadow-sm ${getCourseColor(
                              course,
                            )}`}
                            title={`Clique para remover ${course}`}
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

      <div className="p-3 bg-gray-50 border-t text-xs text-center text-gray-500">
        Clique em uma disciplina para removê-la do horário
      </div>
    </div>
  );
}
