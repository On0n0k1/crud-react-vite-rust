import { Task as ModelTask } from '../../../model/task';
import { Description } from './description';
import { Heading } from './heading';

import { useState } from 'react';

interface EditButtonProps{
    toggleEditMode: () => void,
    editMode: boolean,
}

export function EditButton({ toggleEditMode, editMode }: EditButtonProps) {
    const text = editMode ? "Save" : "Edit";

    return (<div className='
        w-full p-2
        grid items-center
    '>
        <button className='
            p-4 hover:bg-gray-700
            rounded-xl border-white
        ' onClick={ toggleEditMode }>
            { text }
        </button>
    </div>);
}

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
        '>
            <Heading task={ task } editMode={ editMode }/>
            <Description task={ task } editMode={ editMode }/>
            <EditButton toggleEditMode={ toggleEditMode } editMode={ editMode }/>
        </div>
    )
}