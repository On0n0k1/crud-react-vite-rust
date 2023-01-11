import { Task as ModelTask } from '../../model/task';
import { Description } from './description';
import { Heading } from './heading';


export interface CardProps{
    task: ModelTask
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
            <Heading name={ task.name } priority={ task.priority } due={ task.getDue() }/>
            <Description text={ task.description }/>
        </div>
    )
}