import React from 'react'
import styles from '../SwitchTask/SwitchTask.module.css'

const TaskSwitch = ({ register, setRegister }) =>{
    return (
          <div className={styles.switchContainer}>
      <div className={styles.switch___}>
        <p
          className={styles.registerText_ }
          onClick={() => setRegister(true)}
        >
          Register Task
        </p>

        <p
          className={styles.registerText_ }
          onClick={() => setRegister(false)}
        >
          Edit Task
        </p>
      </div>
    </div>
    )
}

export default TaskSwitch