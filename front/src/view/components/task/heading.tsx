import { Due, Task as ModelTask } from '../../../model/task';

interface HeadingProps{
    task: React.MutableRefObject<ModelTask>
}

export function HeadingName({ task }: HeadingProps) {
    return (<span className='
        w-1/3
        font-inherit
    '>
        "{task.current.name}"
    </span>)
}

export function HeadingPriority({ task }: HeadingProps) {
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

export function Heading({ task }: HeadingProps){
    console.log(task.current.name, task.current.priority, task.current.due);

    return (<div className='
        w-full p-3
        flex flex-wrap justify-center
        font-inherit
    '>
        <HeadingName task= { task }/>
        <HeadingPriority task= { task }/>
        <HeadingDate task= { task }/>
    </div>);
}