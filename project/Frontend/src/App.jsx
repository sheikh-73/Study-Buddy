import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Setgoals from "./pages/setgoals";
import SetPrayerTime from "./pages/setprayertime";
import Setyourgoals from "./pages/setyourgoals";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

import AddQuestion from "./pages/add_question";
import AddSolution from "./pages/add_solution";
import FindQuestionAndAnswer from "./pages/find_question_and_solution";
import ForgotPassword from "./pages/forget_password";
import Globalchat from "./pages/globalchat";
import Personalfolder from "./pages/personalfolder";
import Profile from "./pages/profile";
import SetCourses from "./pages/setcourses";
import SetExamRoutine from "./pages/setexamroutine";
import View_progress from "./pages/view_progress";
import ResetPassword from "./pages/reset_password";
// import Notificationmodel from "./pages/notificationmodel"
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Signin></Signin>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/setgoals" element={<Setgoals></Setgoals>}></Route>
          <Route
            path="/setyourgoals"
            element={<Setyourgoals></Setyourgoals>}
          ></Route>
       <Route path="/reset-password/:userId" element={<ResetPassword />} />

          <Route
            path="/setprayertime"
            element={<SetPrayerTime></SetPrayerTime>}
          ></Route>

          <Route path="/setcourses" element={<SetCourses></SetCourses>}></Route>
          <Route path="/globalchat" element={<Globalchat></Globalchat>}></Route>
          <Route
            path="/setexamroutine"
            element={<SetExamRoutine></SetExamRoutine>}
          ></Route>

          <Route
            path="/personalfolder"
            element={<Personalfolder></Personalfolder>}
          ></Route>

          <Route path="/add-question" element={<AddQuestion></AddQuestion>} />
          <Route path="/add-solution" element={<AddSolution></AddSolution>} />

          <Route
            path="/findq&s"
            element={<FindQuestionAndAnswer></FindQuestionAndAnswer>}
          />
          <Route
            path="/viewprogress"
            element={<View_progress></View_progress>}
          ></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          {/* <Route  path="/notification" element={<Notificationmodel></Notificationmodel>}></Route> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
