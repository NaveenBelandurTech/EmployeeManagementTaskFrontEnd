import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeTasks } from "../../src/Component/Features/Slice/AllTask";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allEmployeeTasks = useSelector((state) => state.AllTask.employeeTasks);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllEmployeeTasks());
  }, [dispatch]);

  const filteredTasks = allEmployeeTasks.filter((emp) =>
    emp.employeeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className={styles.homeContainer}>
      <h2 className={styles.title}>Employee Task Dashboard</h2>

      <input
        type="text"
        placeholder="Search by Employee Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />

      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Task Title</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((emp) =>
              emp.tasks.length > 0 ? (
                emp.tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{emp.employeeName}</td>
                    <td>{task.title}</td>
                  </tr>
                ))
              ) : (
                <tr key={emp.employeeId}>
                  <td>{emp.employeeName}</td>
                  <td colSpan={2}>No Tasks Assigned</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Home;
