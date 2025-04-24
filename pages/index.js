import SheduleTable from "components/SheduleTable";
import { useEffect, useState } from "react";
import getSheduleStructure from "utils/getSheduleStructure";

export default function Home() {
  const [courses, setCourses] = useState({
    Course: {
      Monday: ["12:00-12:50"],
      Friday: ["12:00-12:50", "13:00-13:50"],
    },
    Course1: {
      Monday: ["12:00-12:50", "14:00-14:50"],
      Wednesday: ["12:00-12:50", "13:00-13:50"],
    },
    Course3: {
      Monday: ["12:00-12:50", "14:00-14:50"],
      Wednesday: ["12:00-12:50", "13:00-13:50"],
    },
    Course4: {
      Monday: ["12:00-12:50", "14:00-14:50"],
      Wednesday: ["12:00-12:50", "13:00-13:50"],
    },
  });

  const addCourse = (courseName, courseContent) => {
    setCourses((prevCourses) => {
      const newCourses = { ...prevCourses };

      if (newCourses[courseName]) {
        Object.keys(courseContent).map((day) => {
          newCourses[courseName][day] ??= [];
          newCourses[courseName][day].push(...courseContent[day]);
          const noDuplicates = new Set(newCourses[courseName][day]);
          newCourses[courseName][day] = new Array(...noDuplicates);
        });
      } else {
        newCourses[courseName] = courseContent;
      }

      return newCourses;
    });
  };

  // Cores para diferentes disciplinas
  const courseColors = {
    Course: "bg-blue-100 border-blue-300 text-blue-800",
    Course1: "bg-green-100 border-green-300 text-green-800",
    Course3: "bg-red-100 border-red-300 text-red-800",
    Course4: "bg-yellow-100 border-yellow-300 text-yellow-800",
  };

  const dailyShedule = getSheduleStructure();
  Object.keys(courses).map((course) => {
    Object.keys(courses[course]).map((day) => {
      courses[course][day].map((timeDelta) => {
        dailyShedule[day][timeDelta].push(course);
      });
    });
  });

  return (
    <main className="min-h-screen bg-gray-50 flex p-6">
      <div className="w-2/3">
        <SheduleTable
          courseColors={courseColors}
          dailyShedule={dailyShedule}
        ></SheduleTable>
      </div>

      {/* Aqui você pode adicionar o conteúdo para os outros 50% da tela */}
      <div className="w-1/2 pl-6">
        <button
          onClick={function () {
            const number = Math.random();
            addCourse(number.toString(), {
              Friday: ["12:00-12:50", "14:00-14:50"],
            });
          }}
          className="bg-amber-400"
        >
          Add
        </button>
      </div>
    </main>
  );
}
