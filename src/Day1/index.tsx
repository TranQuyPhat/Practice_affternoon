import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router"; 
import type { User } from "./type/task";
import AuthContext from "./context";
import OurTasks from "./page/OurTasks";
import MyTasks from "./page/MyTasks";
import CreateTaskPage from "./page/CreateTask";
import UpdateTaskPage from "./page/UpdateTask";
import AccessDeniedPage from "./page/AccesDeniedPage";
import LoginPage from "./page/LoginPage";
import "../index.css";
import { IoIosLogOut } from "react-icons/io";

function Layout({ user, handleLogout }: { user: User | null; handleLogout: () => void }) {
  const location = useLocation();

  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && (
        <>
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">Tasks Management</h1>
              {user && (
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{user.email}</span>
                </div>
              )}
            </div>
          </header>

          <nav className="bg-blue-600 text-white">
            <div className="container mx-auto px-6 py-3 flex gap-4">
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-blue-500 ${
                    isActive ? "bg-blue-800 font-semibold" : ""
                  }`
                }
              >
                All Tasks
              </NavLink>
              <NavLink
                to="/assignee-me"
                className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-blue-500 ${
                    isActive ? "bg-blue-800 font-semibold" : ""
                  }`
                }
              >
                My Tasks
              </NavLink>
              <NavLink
                to="/create-task"
                className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-blue-500 ${
                    isActive ? "bg-blue-800 font-semibold" : ""
                  }`
                }
              >
                Create Task
              </NavLink>
              <div className="ml-auto flex">
                {user && (
                  <button
                    onClick={handleLogout}
                    className=" px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white flex"
                  >
                    <IoIosLogOut className="mt-1" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default function TasksManagementGuidelines() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Layout user={user} handleLogout={handleLogout} />
        <main className="mx-auto ">
          <Routes>
            <Route index element={user ? <OurTasks /> : <LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            {user && <Route path="/tasks" element={<OurTasks />} />}
            {user && <Route path="/assignee-me" element={<MyTasks />} />}
            {user && <Route path="/create-task" element={<CreateTaskPage />} />}
            {user && <Route path="/update-task/:id" element={<UpdateTaskPage />} />}
            <Route path="/*" element={<AccessDeniedPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
