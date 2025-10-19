import React from "react";
import styles from "./navbar.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./Features/Slice/UserSlice";
import Swal from 'sweetalert2'

const NavBar = () => {
  const UserLogout = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    UserLogout(logout());
    Swal.fire({
      title: "Logout",
      text: "Logout Succesfully",
      icon: "success",
    });
    navigate("/");
  };
  return (
    <>
      <nav className={styles.nav_bar_container}>
        <div className={styles.nav_bar_List}>
          <p onClick={()=> navigate('/Home')}>Employee Management</p>

          <div className={styles.nav_bar_icons___}>
            <p onClick={() => navigate('/employee')}>Employee</p>
            <p onClick={() => navigate('/task')}>Task</p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
