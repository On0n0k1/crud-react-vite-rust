import { Task as ModelTask } from '../../../model/task';
import { Description } from './description';

import Name from './name';
import Due from './due';
import Priority from './priority';
import Edit from './edit';

import { useState } from 'react';


export interface CardProps{
    task: React.MutableRefObject<ModelTask>
}

export default function Card({ task }: CardProps){
    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => setEditMode(!editMode);

    console.log(task);

    return (
        <div className='
            py-4 w-full
            rounded-3xl
            border border-white
            font-mono
            grid grid-cols-2 gap-2
        '>
            <Name task= { task } editMode={ editMode }/>
            <Due task= { task } editMode={ editMode }/>
            <Priority task= { task } editMode={ editMode }/>
            <Description task={ task } editMode={ editMode }/>
            <Edit toggleEditMode={ toggleEditMode } editMode={ editMode }/>
        </div>
    )
}