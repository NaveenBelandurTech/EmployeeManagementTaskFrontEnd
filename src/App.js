import React from "react";
import Form from "./Component/Common/Form";
import EmployeeForm from "./Component/Common/EmployeeForm/Employee";
import TaskForm from "./Component/Common/TaskForm/Task";
import NavBar from "./Component/NavBar";
import Home from "./Component/Home";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthented = localStorage.getItem("Auth");
  return isAuthented ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form component={true} />} />


        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <>
                <NavBar />
                <Home />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <>
                <NavBar />
                <EmployeeForm register={true} />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/task"
          element={
            <ProtectedRoute>
              <>
                <NavBar />
                <TaskForm register={true} />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
