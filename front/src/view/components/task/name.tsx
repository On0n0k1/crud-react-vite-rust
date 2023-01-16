import { Due, Task as ModelTask } from '../../../model/task';

import { useState, useEffect } from 'react';


export interface HeadingNameProps{
    task: React.MutableRefObject<ModelTask>
    editMode: boolean,
}


export default function HeadingName({ task, editMode }: HeadingNameProps) {
    const [name, setName] = useState(task.current.name);
    
    useEffect(()=>{
        task.current.name = name;
        task.current.updated = true;
    }, [name]);

    if (editMode) {
        return (
            <input 
                value={name}
                type='text'
                onChange={(event)=>{
                    setName(event.target.value)
                }}
                className='
                    col-span-2 mx-10 my-2
                    font-inherit text-center
                '
            />
        );
    }
    
    return (<span className='
        w-full col-span-2
        mx-auto
        font-inherit
    '>
        "{task.current.name}"
    </span>)
}