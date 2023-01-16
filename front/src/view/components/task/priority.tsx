import { Task as ModelTask } from '../../../model/task';

import { useState, useEffect } from 'react';

export interface HeadingPriorityProps{
    task: React.MutableRefObject<ModelTask>
    editMode: boolean,
}

export default function HeadingPriority({ task, editMode }: HeadingPriorityProps) {
    const [priority, setPriority] = useState(task.current.priority);

    useEffect(() => {
        task.current.priority = priority;
    },[priority])


    if (editMode) {
        return (
            <span className='
                w-auto
                font-inherit
                flex justify-center items-center
            '>
                <b className='sm:inline'>Priority:</b> 

                <select 
                    value={priority} onChange={(e) => setPriority(Number(e.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                </select>
            </span>
        )    
    }

    return (<span className='
        w-auto
        font-inherit
        flex justify-center items-center
        
    '>
        <b className='
            sm:inline
        '>Priority:</b> { task.current.priority }
    </span>)
}