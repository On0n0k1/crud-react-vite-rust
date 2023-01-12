import { useState } from 'react'

import Task  from '../task/task'
import { Task as TaskData } from '../../../model/task'

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

export default function TaskList() {
    const [tasks, setTasks] = useState([
        new TaskData(
            "name",
            3,
            new Date('jul 21 2024'),
            "A description",
            31
        ),
        new TaskData(
            "name",
            3,
            new Date('jul 21 2024'),
            "A description",
            41
        ),
        new TaskData(
            "name",
            3,
            new Date('jul 21 2024'),
            "A description",
            55
        ),
        new TaskData(
            "name",
            3,
            new Date('jul 21 2024'),
            "A description",
            72
        ),
        
    ]);

    return <div>
        {
            tasks.map((value) => <Task key={value.id} task={ value } handleClick={() => console.log("Clicked ", value)} />)
        }
        <Include />
    </div>    
}