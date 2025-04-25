import { useState } from "react";
import AddCourseMenu from "components/CourseAddMenu";
import ScheduleTable from "components/ScheduleTable";
import CourseList from "components/CourseList";
import getRandomColor from "utils/getRamdomColor";
import getScheduleStructure from "utils/getSheduleStructure";

export default function Home() {
  const [courses, setCourses] = useState({});
  const [coursesColors, setCoursesColors] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addCourse = (courseName, courseContent) => {
    setCoursesColors((prevCoursesColors) => {
      const newCoursesColors = { ...prevCoursesColors };

      if (!newCoursesColors[courseName]) {
        newCoursesColors[courseName] = getRandomColor();
      }

      return newCoursesColors;
    });

    setCourses((prevCourses) => {
      const newCourses = { ...prevCourses };

      if (newCourses[courseName]) {
        Object.keys(courseContent).map((day) => {
          newCourses[courseName][day] ??= [];
          newCourses[courseName][day].push(...courseContent[day]);
          const noDuplicates = new Set(newCourses[courseName][day]);
          newCourses[courseName][day] = Array.from(noDuplicates);
        });
      } else {
        newCourses[courseName] = courseContent;
      }

      return newCourses;
    });
  };

  const removeCourse = (courseName) => {
    setCoursesColors((prevCoursesColors) => {
      const newCoursesColors = { ...prevCoursesColors };
      delete newCoursesColors[courseName];
      return newCoursesColors;
    });

    setCourses((prevCourses) => {
      const newCourses = { ...prevCourses };
      delete newCourses[courseName];
      return newCourses;
    });
  };

  const dailySchedule = getScheduleStructure();
  Object.keys(courses).forEach((course) => {
    Object.keys(courses[course]).forEach((day) => {
      courses[course][day].forEach((timeDelta) => {
        dailySchedule[day][timeDelta].push(course);
      });
    });
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Mobile header with toggle button */}
      <div className="md:hidden bg-white shadow-sm p-4 sticky top-0 z-999">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-700">Horário Semanal</h1>
          <button
            onClick={toggleMobileMenu}
            className="bg-indigo-600 text-white p-2 rounded-lg shadow"
          >
            {isMobileMenuOpen ? "Ver Horário" : "Adicionar"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Schedule Table */}
          <div
            className={`w-full ${isMobileMenuOpen ? "hidden" : "block"} md:block md:w-2/3 md:order-1`}
          >
            <ScheduleTable
              courseColors={coursesColors}
              dailySchedule={dailySchedule}
              removeCourse={removeCourse}
            />
          </div>

          {/* Right side - Course Management */}
          <div
            className={`w-full ${isMobileMenuOpen ? "block" : "hidden"} md:block md:w-1/3 md:order-2 space-y-6`}
          >
            <AddCourseMenu addCourse={addCourse} />

            <CourseList
              courses={courses}
              coursesColors={coursesColors}
              removeCourse={removeCourse}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
