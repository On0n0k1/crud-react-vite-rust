import { Due, Task as ModelTask } from '../../../model/task';

import Calendar from './calendar';

import { useRef } from 'react';


export interface HeadingDueProps{
    task: React.MutableRefObject<ModelTask>
    editMode: boolean,
}

function Years({ due, counter }: { due: Due, counter: React.MutableRefObject<number> }){
    if (counter.current>1){
        counter.current= counter.current + 1;
        return (<></>);
    }

    return (
        <>{ due.years }<b className='hidden lg:inline'> years, </b><b className='sm:inline lg:hidden'> yr </b></>
    )
}

function Months({ due, counter }: { due: Due, counter: React.MutableRefObject<number> }){
    if (counter.current>1){
        return (<></>);
    }

    return (
        <>{ due.months }<b className='hidden lg:inline'> months, </b><b className='sm:inline lg:hidden'> mon </b></>
    )
}

function Days({ due, counter }: { due: Due, counter: React.MutableRefObject<Number> }){
    if (counter.current>1){
        return (<></>);
    }

    return (
        <>{ due.days }<b className='inline'> days </b></>
    )
}

function Hours({ due, counter }: { due: Due, counter: React.MutableRefObject<Number> }){
    if (counter.current>1){
        return (<></>);
    }

    return (
        <>{ due.hours }<b className='hidden lg:inline'> hours, </b><b className='sm:inline lg:hidden'> hr </b></>
    )
}

function Minutes({ due, counter }: { due: Due, counter: React.MutableRefObject<Number> }){
    if (counter.current>1){
        return (<></>);
    }

    return (
        <>{ due.minutes }<b key={"minutes1"} className='hidden lg:inline'> minutes </b><b className='sm:inline lg:hidden'> min </b></>
    )
}

function Seconds({ due, counter }: { due: Due, counter: React.MutableRefObject<Number> }){
    if (counter.current>1){
        return (<></>);
    }

    return (
        <>{ due.seconds }<b key={"seconds1"} className='hidden lg:inline'> seconds </b><b className='sm:inline lg:hidden'> sec </b></>
    )
}

export default function HeadingDue({ task, editMode }: HeadingDueProps) {
    if (editMode) { 
        return (
            <div className='
                w-auto h-auto
                mx-10
                grid items-center
            '>
                <b className='hidden lg:inline'>Completed by: </b> 
                <Calendar task={ task }/>
            </div>
        )
    }

    let due: Due = task.current.getDue();
    let counter: React.MutableRefObject<number> = useRef(0);

    let components = [
        (<Years key='first' counter={counter} due={due}/>),
        (<Months key='second' counter={counter} due={due}/>),
        (<Days key='third' counter={counter} due={due}/>),
        (<Hours key='fourth' counter={counter} due={due}/>),
        (<Minutes key='fifth' counter={counter} due={due}/>),
        (<Seconds key='sixth' counter={counter} due={due}/>),
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
    
    return (
        <span className='
            sm:w-auto w-25 pb-1
            font-inherit
        '>
            <b key={"duecomponent"} className='hidden lg:inline'>Due: </b> 
            { renderedComponents }
        </span>
    );
}