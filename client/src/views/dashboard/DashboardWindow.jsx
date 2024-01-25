import AttendanceMenu from "./AttendanceMenu";
import GradesMenu from "./GradesMenu";
import AccountInfo from "./AccountInfo";
import { useEffect, useState } from "react";
import TeacherGradesMenu from "./TeacherGradesMenu";

function DashboardWindow({ currentTab, loggedUser, userType }) {

    const [studentCourses, setStudentCourses] = useState("")
    const [studentCoursesID, setStudentGradesID] = useState("")

    useEffect(() => {
        async function fetchStudentCourses() {
            try {
                const response = await fetch(`http://localhost:4000/courses/${loggedUser.student_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    // const coursesName = data.map(enrollment => enrollment.course.name)
                    const coursesID = data.map(enrollment => enrollment.course_id)
                    setStudentCourses(data)
                    setStudentGradesID(coursesID)
                } else {
                    console.log("Response is not okay")
                }
            } catch {
                console.log("GET didn't work")
            }
        }
        fetchStudentCourses()
    }, [])

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-64">
            </div>
            {currentTab === "grades" ? (
                (userType == "t" ?
                    (<TeacherGradesMenu loggedUser={loggedUser} />) :
                    (<GradesMenu loggedUser={loggedUser} studentCourses={studentCourses} studentCoursesID={studentCoursesID} />))

            ) : currentTab === "attendance" ? (
                <AttendanceMenu loggedUser={loggedUser} />
            ) : (
                <AccountInfo loggedUser={loggedUser} studentCourses={studentCourses} />
            )}
        </div>
    );
}

export default DashboardWindow;