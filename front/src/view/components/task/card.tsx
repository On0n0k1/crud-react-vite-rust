import { Task as ModelTask } from '../../../model/task';
import { Description } from './description';
import { Heading } from './heading';


export function EditButton() {
    return (<div className='
        w-full p-2
        grid items-center
    '>
        <button className='
            p-4 hover:bg-gray-700
            rounded-xl border-white
        '>
            Edit
        </button>
    </div>);
}

export interface CardProps{
    task: React.MutableRefObject<ModelTask>
}

export default function Card({ task }: CardProps){
    console.log(task);

    return (
        <div className='
            py-4 w-full
            rounded-3xl
            border border-white
            font-mono
        '>
            <Heading task={ task }/>
            <Description task={ task }/>
            <EditButton />
        </div>
    )
}