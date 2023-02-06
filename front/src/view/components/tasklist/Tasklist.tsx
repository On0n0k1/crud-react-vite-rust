import { useRef } from 'react'

import Task  from '../task/Task'
import { Task as ModelTask } from '../../../model/model'

// Button that creates a new task
function Include() {
    const action = () => console.log("+ clicked");

    fetch('/api/data', {
        method: 'POST',             // or 'PUT'
        body: JSON.stringify({ data: "testing"}), // data can be 'string' or {object}!
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => response.json())
    .then(data => {
        console.log("Successfully acquired data");
        console.log('Success:', data);
    })
    .catch((error) => {
        console.log("Failed to acquire data");
        console.error('Error:', error);
    });

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
    const taskList = [
        new ModelTask(
            "name",
            3,
            new Date('jan 21 2023'),
            "A description",
            31,
            0,
        ),
        new ModelTask(
            "nameee",
            1,
            new Date('feb 18 2023'),
            "A description",
            41,
            1,
        ),
        new ModelTask(
            "name",
            6,
            new Date('jul 21 2024'),
            "A description",
            55,
            2,
        ),
        new ModelTask(
            "name",
            5,
            new Date('jan 30 2023'),
            "A description",
            72,
            3,
        ),
        
    ];

    const tasks: React.MutableRefObject<ModelTask>[] = new Array();

    taskList.forEach((item, _) => {
        tasks.push(useRef(item));
    })

    return <div>
        {
            tasks.map((value) => (
                <Task
                    key={value.current.id}
                    task={ value } 
                    handleRemove={ () => console.log("Called Remove on index ", value.current.index)}
                />)
            )
        }
        <Include />
    </div>    
}