import React, { useState, useEffect } from "react";
import styles from "../EmployeeForm/Employee.module.css";
import SwitchEmployee from "./Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  getEmployees,
  editEmployee,
} from "../../Features/Slice/EmployeeSlice";
import Swal from "sweetalert2";

const EmployeeFormRegister = ({ register }) => {
  const dispatch = useDispatch();

  const employeesList = useSelector((state) => state.employee.employees);

  const [editId, setEditId] = useState(null);
  const [isRegister, setIsRegister] = useState(register);

  const [employeeState, setEmployee] = useState({
    employeeName: "",
    Gender: "",
    role: "",
  });

  const [error, setError] = useState({
    employeeNameError: "",
    genderError: "",
    roleError: "",
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const validateEmployeeName = (value) => {
    if (value === "") {
      setError((prev) => ({
        ...prev,
        employeeNameError: "Employee Name cannot be empty",
      }));
      return false;
    } else {
      setError((prev) => ({ ...prev, employeeNameError: "" }));
      return true;
    }
  };

  const validateGender = (value) => {
    if (value === "") {
      setError((prev) => ({
        ...prev,
        genderError: "Gender cannot be empty",
      }));
      return false;
    } else {
      setError((prev) => ({ ...prev, genderError: "" }));
      return true;
    }
  };

  const validateRole = (value) => {
    if (value === "") {
      setError((prev) => ({
        ...prev,
        roleError: "Role cannot be empty",
      }));
      return false;
    } else {
      setError((prev) => ({ ...prev, roleError: "" }));
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "employeeName") validateEmployeeName(value);
    if (name === "Gender") validateGender(value);
    if (name === "role") validateRole(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameValid = validateEmployeeName(employeeState.employeeName);
    const isGenderValid = validateGender(employeeState.Gender);
    const isRoleValid = validateRole(employeeState.role);

    if (!isNameValid || !isGenderValid || !isRoleValid) return;

    if (isRegister) {
      dispatch(createEmployee(employeeState));
      Swal.fire({
        title: "Success",
        text: "Employee Created Successfully",
        icon: "success",
      });
    } else if (editId) {
      dispatch(editEmployee({ id: editId, employeeData: employeeState }));
      Swal.fire({
        title: "Success",
        text: "Employee Edited Successfully",
        icon: "success",
      });
    }

    setEmployee({ employeeName: "", Gender: "", role: "" });
    setEditId(null);
    setIsRegister(true);
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setIsRegister(true);
      setEmployee({ employeeName: "", Gender: "", role: "" });
      setEditId(null);
      return;
    }
    const emp = employeesList.find((emp) => emp._id === selectedId);
    if (emp) {
      setIsRegister(false);
      setEditId(emp._id);
      setEmployee({
        employeeName: emp.employeeName,
        Gender: emp.Gender,
        role: emp.role,
      });
    }
  };

  return (
    <section>
      <SwitchEmployee register={isRegister} setRegister={setIsRegister} />

      <section className={styles.container}>
        {!isRegister && (
          <div className={styles.DropDown_container}>
            <label htmlFor="selectEmployee" className={styles.label_fnt}>
              Select Employee to Edit
            </label>
            <select
              id="selectEmployee"
              value={editId || ""}
              onChange={handleSelectChange}
              className={styles.dropdown___select}
            >
              <option value="">Select Employee</option>
              {employeesList.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeName}
                </option>
              ))}
            </select>
          </div>
        )}

        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div>
            <h2 className={styles.form_title__}>
              {isRegister ? "Register Employee" : "Edit Employee"}
            </h2>
          </div>

          <div className={styles.form_box}>
            <label htmlFor="employeeName" className={styles.label_fnt}>
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={employeeState.employeeName}
              onChange={handleChange}
              placeholder="Your Employee Name"
            />
            {error.employeeNameError && (
              <span className={styles.error_validation}>
                {error.employeeNameError}
              </span>
            )}

            <label htmlFor="gender" className={styles.label_fnt}>
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="Gender"
              value={employeeState.Gender}
              onChange={handleChange}
              placeholder="Your Gender"
            />
            {error.genderError && (
              <span className={styles.error_validation}>
                {error.genderError}
              </span>
            )}

            <label htmlFor="role" className={styles.label_fnt}>
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={employeeState.role}
              onChange={handleChange}
              placeholder="Your Role"
            />
            {error.roleError && (
              <span className={styles.error_validation}>{error.roleError}</span>
            )}

            <button type="submit" className={styles.btn_container}>
              {isRegister ? "Register Employee" : "Edit Employee"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default EmployeeFormRegister;
