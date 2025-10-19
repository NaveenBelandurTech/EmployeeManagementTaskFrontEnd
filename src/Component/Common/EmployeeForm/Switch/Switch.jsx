import React from "react";
import styles from "../Switch/Switch.module.css";

const SwitchEmployee = ({ register, setRegister }) => {
  return (
    <div className={styles.switchContainer}>
      <div className={styles.switch___}>
        <p
          className={styles.registerText_ }
          onClick={() => setRegister(true)}
        >
          Register Employee
        </p>

        <p
          className={styles.registerText_ }
          onClick={() => setRegister(false)}
        >
          Edit Employee
        </p>
      </div>
    </div>
  );
};

export default SwitchEmployee;
