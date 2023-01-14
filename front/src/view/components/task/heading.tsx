import { Due, Task as ModelTask } from '../../../model/task';

import { useState, useEffect } from 'react';
import Calendar from './calendar';


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

export function HeadingDate({ task, editMode }: HeadingProps) {
    if (editMode) { 
        return (
            <div className='w-auto h-auto'>
                <Calendar task={ task }/>
            </div>
        )
    }

    let due = task.current.getDue();

    let components = [
        (<>{ due.years }<b className='hidden lg:inline'> years, </b><b className='sm:inline lg:hidden'> yr </b></>),
        (<>{ due.months }<b className='hidden lg:inline'> months, </b><b className='sm:inline lg:hidden'> mon </b></>),
        (<>{ due.days }<b className='inline'> days </b></>),
        (<>{ due.hours }<b className='hidden lg:inline'> hours, </b><b className='sm:inline lg:hidden'> hr </b></>),
        (<>{ due.minutes }<b className='hidden lg:inline'> minutes </b><b className='sm:inline lg:hidden'> min </b></>),
        (<>{ due.seconds }<b className='hidden lg:inline'> seconds </b><b className='sm:inline lg:hidden'> sec </b></>),
    ];

    let attributes = [
        due.years,
        due.months,
        due.days,
        due.hours,
        due.minutes,
        due.seconds,
    ];

    let renderedComponents = [];

    for (let step = 0; step < components.length; step++){
        if(renderedComponents.length>1){
            break;
        }

        if (attributes[step] != 0){
            renderedComponents.push(components[step]);
        }
    }
    
    return (<span className='
        sm:w-1/3 w-25 pb-1
        font-inherit
    '>
        <b className='hidden lg:inline'>Due: </b> 
        { renderedComponents }
        
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