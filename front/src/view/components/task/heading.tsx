import { Due } from '../../../model/task';


export function HeadingName({ name }: { name: string }) {
    return (<span className='
        w-1/3
        font-inherit
    '>
        "{name}"
    </span>)
}

export function HeadingPriority({ priority }: { priority: number }) {
    return (<span className='
        sm:w-1/4 w-1/5
        font-inherit
    '>
        <b className='hidden sm:inline'>Priority:</b> { priority }
    </span>)
}

export function HeadingDate({ due }: { due: Due }) {
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

export interface HeadingProps {
    name: string,
    priority: number,
    due: Due,
}

export function Heading({ name, priority, due }: HeadingProps){
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