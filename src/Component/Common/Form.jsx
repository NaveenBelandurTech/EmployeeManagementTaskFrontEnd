import React from "react";
import styles from "../Common/Form.module.css";
import { useState } from "react";
import { userRegister, userLogin } from "../Features/Slice/UserSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Form = ({ component }) => {
  const [isRegister, setIsRegister] = useState(component);
  const RegisterDispatch = useDispatch();
  const UserDispatch = useDispatch();
  const Navigate = useNavigate();

  const [register, setRegister] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, seterror] = useState({
    usernameError: "",
    passwordError: "",
    emailError: "",
  });

  const validateUsername = (value) => {
    if (value === "") {
      seterror((prev) => ({
        ...prev,
        usernameError: "Username cannot be empty",
      }));
      return false;
    } else {
      seterror((prev) => ({
        ...prev,
        usernameError: "",
      }));

      return true;
    }
  };

  const validatePassword = (value) => {
    if (value === "") {
      seterror((prev) => ({
        ...prev,
        passwordError: "Password cannot be empty",
      }));
      return false;
    } else {
      seterror((prev) => ({
        ...prev,
        passwordError: "",
      }));

      return true;
    }
  };

  const validateEmail = (value) => {
    if (value === "") {
      seterror((prev) => ({
        ...prev,
        emailError: "Email cannot be empty",
      }));

      return false;
    } else {
      seterror((prev) => ({
        ...prev,
        emailError: "",
      }));

      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegister((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name == "username") {
      validateUsername(value);
    }

    if (name == "password") {
      validatePassword(value);
    }

    if (name == "email") {
      validateEmail(value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate fields
    const isUsername = isRegister ? validateUsername(register.username) : true;
    const isPassword = validatePassword(register.password);
    const isEmail = isRegister ? validateEmail(register.email) : true;

    if (isUsername && isPassword && isEmail) {
      try {
        if (isRegister) {
          // Register
          const FormData = {
            username: register.username,
            password: register.password,
            email: register.email,
          };
          await RegisterDispatch(userRegister(FormData));
          Swal.fire({
            title: "Registered",
            text: "Registered Succesfully",
            icon: "success",
          });
        } else {
          // Login
          const loginData = {
            email: register.email,
            password: register.password,
          };
          await UserDispatch(userLogin(loginData));
          console.log(loginData, "login data");
          Swal.fire({
            title: "Login",
            text: "Login Succesfully",
            icon: "success",
          });
        }

        // Clear form after success
        setRegister({ username: "", password: "", email: "" });
        seterror({ usernameError: "", passwordError: "", emailError: "" });

        // Navigate to home
        Navigate("/Home");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <>
      <section className={styles.container}>
        <form className={styles.form_container}>
          <div>
            <h2 className={styles.form_title__}>
              {isRegister ? "Register" : "Login"}
            </h2>
          </div>

          <div className={styles.form_box}>
            {isRegister ? (
              <>
                <label htmlFor="username" className={styles.label_fnt}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={register.username}
                  onChange={handleChange}
                  name="username"
                  placeholder="Your Username"
                />
                {error.usernameError && (
                  <span className={styles.error_validation}>
                    Username Cannot be Empty
                  </span>
                )}
              </>
            ) : (
              ""
            )}

            <label htmlFor="password" className={styles.label_fnt}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={register.password}
              onChange={handleChange}
              name="password"
              placeholder="Your Password"
            />
            {error.passwordError && (
              <span className={styles.error_validation}>
                Password Cannot be Empty
              </span>
            )}

            <label htmlFor="email" className={styles.label_fnt}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={register.email}
              onChange={handleChange}
              name="email"
              placeholder="Your Email"
            />
            {error.emailError && (
              <span className={styles.error_validation}>
                Email Cannot be Empty
              </span>
            )}

            <button onClick={handleClick} className={styles.btn_container}>
              {isRegister ? "Register" : "Login"}
            </button>
          </div>

          {isRegister && (
            <p className={styles.login_title} onClick={toggleForm}>
              Already Registered Login
            </p>
          )}
        </form>
      </section>
    </>
  );
};

export default Form;
