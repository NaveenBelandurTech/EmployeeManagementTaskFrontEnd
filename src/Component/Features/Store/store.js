import {configureStore} from '@reduxjs/toolkit'
import UserReducer from '../Slice/UserSlice'
import EmployeeReducer from '../Slice/EmployeeSlice'
import TaskReducer from '../Slice/TaskSlice'
import EmployeeAllTask from '../Slice/AllTask'



const Store = configureStore({
    reducer:{
        user:UserReducer,
        employee:EmployeeReducer,
        task:TaskReducer,
        AllTask:EmployeeAllTask
    }
})

export default Store