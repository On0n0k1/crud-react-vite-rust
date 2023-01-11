import { Due, Task as ModelTask }from '../../model/task'


function HeadingName({ name }: { name: string }) {
    return (<span className='
        w-1/3
        font-inherit
    '>
        "{name}"
    </span>)
}

function HeadingPriority({ priority }: { priority: number }) {
    return (<span className='
        sm:w-1/4 w-1/5
        font-inherit
    '>
        <b className='hidden sm:inline'>Priority:</b> { priority }
    </span>)
}

function HeadingDate({ due }: { due: Due }) {
    return (<span className='
        sm:w-1/3 w-25 pb-1
        font-inherit
    '>
        <b className='hidden lg:inline'>Due: </b> 
        { due.days }<b className='hidden lg:inline'> days, </b><b className='lg:hidden sm:inline hidden'> d </b><b className='inline sm:hidden'>d </b>
        { due.hours }<b className='hidden lg:inline'> hours, </b><b className='lg:hidden sm:inline hidden'> hr </b><b className='inline sm:hidden'>h </b>
        {/* { due.minutes }<b className='hidden lg:inline'> minutes </b><b className='lg:hidden sm:inline hidden'> min </b><b className='inline sm:hidden'>m </b> */}
    </span>)
}

interface HeadingProps {
    name: string,
    priority: number,
    due: Due,
}

function Heading({ name, priority, due }: HeadingProps){
    console.log(name, priority, due);

    return (<div className='
        w-full p-3
        flex flex-wrap justify-center
        font-inherit
    '>
        <HeadingName name={ name }/>
        <HeadingPriority priority={ priority }/>
        <HeadingDate due={ due }/>
    </div>);
}

function Description({text}: { text: string}) {
    console.log(text);

    return (
        <div className='flex justify-center items-center p-3'>
            <div className='
                hidden
                lg:grid items-center
                px-2
            '>
                <p className='
                    
                    text-2xl font-inherit
                    pl-4
                '><b>Description:</b></p>
            </div>
            <div className='
                w-4/5  grid items-center
                px-2 py-4
            '>
                <p className='font-inherit'>
                    { text }
                </p>
                
            </div>
        </div>

        
    );
}

interface CardProps{
    task: ModelTask
}



function Card({ task }: CardProps){
    console.log(task);

    return (
        <div className='
            py-4 w-full
            rounded-3xl
            border border-white
            font-mono
        '>
            <Heading name={ task.name } priority={ task.priority } due={ task.getDue() }/>
            <Description text={ task.description }/>
        </div>
    )
}


interface ChildProps {
    // myFunction: React.MutableRefObject<() => void>; // React MutableRefObject
    handleClick: () => void;
    task: ModelTask;
}

export default function Task({ handleClick, task }: ChildProps) {

    return (
        <div className='
            flex justify-center items-center p-2
        '>
            <Card task={ task }/>
            <button className='
                ml-4 mr-2 lg:ml-8 lg:mr-4
                border-white border rounded-2xl
                hover:bg-gray-700
            ' onClick={ handleClick }>
                <p className='
                    p-2 px-4 font-mono font-bold
                '>x</p>
            </button>
        </div>
    )
}

