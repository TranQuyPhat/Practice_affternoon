import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";

// Layouts
import MainLayout from "./MainLayout";
import Day1Layout from "./Day1/Day1Layout";
import Bai1Layout from "./Day1/Bai1/Bai1Layout";
import Bai2Layout from "./Day1/Bai2/Bai2Layout";

// Pages bài học
import Page1 from "./Day1/Bai1/Page1";
import Page2 from "./Day1/Bai1/Page2";
import Page2B1 from "./Day1/Bai2/Page1";
import Page2B2 from "./Day1/Bai2/Page2";
import Bai1Day2 from "./Day2/Bai1Day2";

// Tasks App
import LoginPage from "./Day1/page/LoginPage";
import PrivateRoute from "./Day1/router/PrivateRoute";
import CreateTask from "./Day1/page/CreateTask";
import OurTasks from "./Day1/page/OurTasks";
import MyTasks from "./Day1/page/MyTasks";
import UpdateTask from "./Day1/page/UpdateTask";
import TasksManagementGuidelines from "./Day1";

function App() {
  return (
    <TasksManagementGuidelines/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<MainLayout />}>
    //       {/* Public routes */}
    //       <Route path="login" element={<LoginPage />} />

    //       {/* Protected task routes */}
    //       <Route element={<PrivateRoute />}>
    //         <Route path="tasks" element={<TaskManager />} />
    //         <Route path="tasks/create" element={<CreateTask />} />
    //         <Route path="tasks/our" element={<OurTasks />} />
    //         <Route path="tasks/mine" element={<MyTasks />} />
    //         <Route path="tasks/update/:id" element={<UpdateTask />} />
    //       </Route>

    //       {/* Bài học day1 */}
    //       <Route path="day1" element={<Day1Layout />}>
    //         <Route path="bai1" element={<Bai1Layout />}>
    //           <Route path="page1" element={<Page1 />} />
    //           <Route path="page2" element={<Page2 />} />
    //         </Route>
    //         <Route path="bai2" element={<Bai2Layout />}>
    //           <Route path="page1" element={<Page2B1 />} />
    //           <Route path="page2" element={<Page2B2 />} />
    //         </Route>
    //       </Route>

    //       {/* Bài học day2 */}
    //       <Route path="day2">
    //         <Route path="bai1" element={<Bai1Day2 />} />
    //       </Route>

    //       {/* Redirect unknown to login */}
    //       <Route path="*" element={<Navigate to="/login" />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
