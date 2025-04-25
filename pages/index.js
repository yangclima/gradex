import { useState } from "react";

// Components
import AddCourseMenu from "components/CourseAddMenu";
import SheduleTable from "components/SheduleTable";

// utils
import getRandomColor from "utils/getRamdomColor";
import getSheduleStructure from "utils/getSheduleStructure";

export default function Home() {
  const [courses, setCourses] = useState({});
  const [coursesColors, setCoursesColors] = useState({});

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
          newCourses[courseName][day] = new Array(...noDuplicates);
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
          courseColors={coursesColors}
          dailyShedule={dailyShedule}
          removeCourse={removeCourse}
        ></SheduleTable>
      </div>

      {/* Aqui você pode adicionar o conteúdo para os outros 50% da tela */}
      <div className="w-1/2 pl-6">
        <AddCourseMenu addCourse={addCourse}></AddCourseMenu>
      </div>
    </main>
  );
}
