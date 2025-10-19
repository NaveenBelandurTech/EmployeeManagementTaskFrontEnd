import React, { useState, useEffect } from "react";
import styles from "../TaskForm/Task.module.css";
import TaskSwitch from "./SwitchTask/SwitchTask";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTasks, editTask } from "../../Features/Slice/TaskSlice";
import { getEmployees } from "../../Features/Slice/EmployeeSlice";
import Swal from "sweetalert2";

const TaskFormRegister = ({ register }) => {
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(register);
  const [editId, setEditId] = useState(null);

  const [taskData, setTaskData] = useState({
    taskName: "",
    taskDetails: "",
    status: "",
    employee: "",
  });

  const employeesList = useSelector((state) => state.employee?.employees || []);
  const tasksList = useSelector((state) => state.task?.tasks || []);

  const [error, setError] = useState({
    taskNameError: "",
    taskDetailsError: "",
    statusError: "",
    employeeError: "",
  });

  const validateTaskName = (value) => {
    if (value.trim() === "") {
      setError((prev) => ({
        ...prev,
        taskNameError: "Task Name cannot be empty",
      }));
      return false;
    } else {
      setError((prev) => ({ ...prev, taskNameError: "" }));
      return true;
    }
  };

  const validateTaskDetails = (value) => {
    if (value.trim() === "") {
      setError((prev) => ({
        ...prev,
        taskDetailsError: "Task Details cannot be empty",
      }));
      return false;
    } else {
      setError((prev) => ({ ...prev, taskDetailsError: "" }));
      return true;
    }
  };

  const validateStatus = (value) => {
    if (value.trim() === "") {
      setError((prev) => ({
        ...prev,
        statusError: "Status cannot be empty",
      }));
      return false;
    } else {
      setError((prev) => ({ ...prev, statusError: "" }));
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "taskName") validateTaskName(value);
    if (name === "taskDetails") validateTaskDetails(value);
    if (name === "status") validateStatus(value);
  };

  const handleTaskSelect = (e) => {
    const selectedTaskId = e.target.value;
    const selectedTask = tasksList.find((task) => task._id === selectedTaskId);
    if (selectedTask) {
      setEditId(selectedTask._id);
      setTaskData({
        taskName: selectedTask.title || "",
        taskDetails: selectedTask.taskdetails || "",
        status: selectedTask.status ? "true" : "false",
        employee: selectedTask.employee?._id || "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameValid = validateTaskName(taskData.taskName);
    const isDetailsValid = validateTaskDetails(taskData.taskDetails);
    const isStatusValid = validateStatus(taskData.status);

    if (isNameValid && isDetailsValid && isStatusValid) {
      const payload = {
        title: taskData.taskName,
        taskdetails: taskData.taskDetails,
        status: taskData.status === "true",
        employee: taskData.employee,
      };

      if (isRegister) {
        dispatch(createTask(payload));
        Swal.fire("Success", "Task Created Successfully", "success");
      } else if (editId) {
        dispatch(editTask({ id: editId, taskData: payload }));
        Swal.fire("Success", "Task Updated Successfully", "success");
      }

      setTaskData({
        taskName: "",
        taskDetails: "",
        status: "",
        employee: "",
      });
      setEditId(null);
    } else {
      console.warn("Please fill all required fields");
      Swal.fire("Error", "Please fill all required fields", "error");
    }
  };

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <section>
      <TaskSwitch register={isRegister} setRegister={setIsRegister} />

      <section className={styles.container}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div>
            <h2 className={styles.form_title__}>
              {isRegister ? "Register Task" : "Edit Task"}
            </h2>
          </div>

          <div className={styles.form_box}>
            {/* Task selection dropdown (Edit mode only) */}
            {!isRegister && (
              <>
                <label htmlFor="selectTask" className={styles.label_fnt}>
                  Select Task to Edit
                </label>
                <select
                  id="selectTask"
                  onChange={handleTaskSelect}
                  value={editId || ""}
                  className={styles.dropdown___select}
                >
                  <option value="">Select Task</option>
                  {tasksList.map((task) => (
                    <option key={task._id} value={task._id}>
                      {task.title}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Employee Dropdown */}
            <label htmlFor="employee" className={styles.label_fnt}>
              Select Employee
            </label>
            <select
              id="employee"
              name="employee"
              value={taskData.employee}
              onChange={handleChange}
              className={styles.dropdown___select}
            >
              <option value="">Select Employee </option>
              {employeesList.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeName}
                </option>
              ))}
            </select>
            {error.employeeError && (
              <span className={styles.error_validation}>
                {error.employeeError}
              </span>
            )}

            {/* Task Name */}
            <label htmlFor="taskName" className={styles.label_fnt}>
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={taskData.taskName}
              onChange={handleChange}
              placeholder="Your Task Name"
            />
            {error.taskNameError && (
              <span className={styles.error_validation}>
                {error.taskNameError}
              </span>
            )}

            {/* Task Details */}
            <label htmlFor="taskDetails" className={styles.label_fnt}>
              Task Details
            </label>
            <textarea
              id="taskDetails"
              name="taskDetails"
              value={taskData.taskDetails}
              onChange={handleChange}
              placeholder="Your Task Details"
              rows={8}
              cols={10}
            ></textarea>
            {error.taskDetailsError && (
              <span className={styles.error_validation}>
                {error.taskDetailsError}
              </span>
            )}

            {/* Status */}
            <label htmlFor="status" className={styles.label_fnt}>
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={taskData.status}
              onChange={handleChange}
              placeholder="Your Task Status"
            />
            {error.statusError && (
              <span className={styles.error_validation}>
                {error.statusError}
              </span>
            )}

            <button type="submit" className={styles.btn_container}>
              {isRegister ? "Register Task" : "Edit Task"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default TaskFormRegister;
