// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import Task  from './view/components/task/task'
// import { Task as TaskData } from './model/task'
import TaskList from './view/components/tasklist/tasklist'
import './App.css'


function App() {
    const handleClick = () => console.log("clicked")
    return (
        <TaskList />
    )
}

export default App