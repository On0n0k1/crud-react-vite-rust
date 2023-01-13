import { useState, useRef } from 'react'

import Task  from '../task/task'
import { Task as ModelTask } from '../../../model/task'

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
    const tasklist = [
        new ModelTask(
            "name",
            3,
            new Date('jul 21 2024'),
            "A description",
            31
        ),
        new ModelTask(
            "name",
            3,
            new Date('jul 21 2024'),
            "A description",
            41
        ),
        new ModelTask(
            "name",
            3,
            new Date('jul 21 2024'),
            "A description",
            55
        ),
        new ModelTask(
            "name",
            3,
            new Date('jan 14 2023'),
            "A description",
            72
        ),
        
    ];

    const tasks: React.MutableRefObject<ModelTask>[] = new Array();

    tasklist.forEach((item, index) => {
        tasks.push(useRef(item));
    })



    return <div>
        {
            tasks.map((value) => <Task key={value.current.id} task={ value } handleClick={() => console.log("Clicked ", value)} />)
        }
        <Include />
    </div>    
}