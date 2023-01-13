import { Due, Task as ModelTask } from '../../../model/task';

import { useState, useEffect } from 'react';

interface HeadingProps{
    task: React.MutableRefObject<ModelTask>
    editMode: boolean,
}

export function HeadingName({ task, editMode }: HeadingProps) {
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
            w-1/3
            font-inherit text-center
        ' />)    
    }
    

    return (<span className='
        w-1/3
        font-inherit
    '>
        "{task.current.name}"
    </span>)
}

export function HeadingPriority({ task, editMode }: HeadingProps) {
    const [priority, setPriority] = useState(task.current.priority);

    useEffect(() => {
        task.current.priority = priority;
    },[priority])


    if (editMode) {
        return (<span className='
            sm:w-1/4 w-1/5
            font-inherit
        '>
            <b className='hidden sm:inline'>Priority:</b> 

            <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
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
        </span>)    
    }

    return (<span className='
        sm:w-1/4 w-1/5
        font-inherit
    '>
        <b className='hidden sm:inline'>Priority:</b> { task.current.priority }
    </span>)
}

export function HeadingDate({ task }: HeadingProps) {
    let due = task.current.getDue();

    return (<span className='
        sm:w-1/3 w-25 pb-1
        font-inherit
    '>
        <b className='hidden lg:inline'>Due: </b> 
        { due.years }<b className='hidden lg:inline'> years, </b><b className='lg:hidden sm:inline hidden'> y </b><b className='inline sm:hidden'>y </b>
        { due.months }<b className='hidden lg:inline'> months, </b><b className='lg:hidden sm:inline hidden'> m </b><b className='inline sm:hidden'>m </b>
        { due.days }<b className='hidden lg:inline'> days, </b><b className='lg:hidden sm:inline hidden'> d </b><b className='inline sm:hidden'>d </b>
        { due.hours }<b className='hidden lg:inline'> hours, </b><b className='lg:hidden sm:inline hidden'> hr </b><b className='inline sm:hidden'>h </b>
        { due.minutes }<b className='hidden lg:inline'> minutes </b><b className='lg:hidden sm:inline hidden'> min </b><b className='inline sm:hidden'>m </b>
        { due.seconds }<b className='hidden lg:inline'> seconds </b><b className='lg:hidden sm:inline hidden'> sec </b><b className='inline sm:hidden'>s </b>
        
    </span>)
}

export function Heading({ task, editMode }: HeadingProps){
    console.log(task.current.name, task.current.priority, task.current.due);

    return (<div className='
        w-full p-3
        flex flex-wrap justify-center
        font-inherit
    '>
        <HeadingName task= { task } editMode={ editMode }/>
        <HeadingPriority task= { task } editMode={ editMode }/>
        <HeadingDate task= { task } editMode={ editMode }/>
    </div>);
}