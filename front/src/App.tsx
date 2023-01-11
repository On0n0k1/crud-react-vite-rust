import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Task  from './view/components/task'
import Model from './model/task'
import './App.css'

function Include() {
    const action = () => console.log("+ clicked");

    return (
        <div className='
            py-20 w-full
        '>
            <button className='
                w-10 h-10 mx-auto
                border rounded-2xl border-white
                grid items-center
                font-bold
                hover:bg-gray-700
            '
            onClick={action}>+</button>
        </div>
    )
}

function TaskList() {
    const [tasks, setTasks] = useState([1,2,3,4]);

    return <div>
        {
            tasks.map((value) => <Task key={value} handleClick={() => console.log("Clicked ", value)} />)
        }
        <Include />
    </div>    
}

function App() {
    const handleClick = () => console.log("clicked")
    return (
        <TaskList />
        // <div>
        //     <Task handleClick={ handleClick }/>
        // </div>
    )
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

export default App
