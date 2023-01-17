import { Task as ModelTask } from '../../../../model/model'

import { useEffect, useState } from 'react';

interface DescriptionProps{
    task: React.MutableRefObject<ModelTask>,
    editMode: boolean,
}


export function Description({ task, editMode }: DescriptionProps) {
    const [description, setDescription] = useState(task.current.description);
    
    useEffect(()=>{
        task.current.description = description;
        task.current.updated = true;
    }, [description]);

    console.log(task.current.description);
    
    if (editMode) {
        return (
            <div className='
                flex justify-center items-center p-3
                col-span-2
            '>
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
                    <input 
                        type="text"
                        value={description}
                        onChange={event => {
                            setDescription(event.target.value)
                        }}
                        className='font-inherit text-center' 
                    /> 
                </div>
            </div>
        )
    }

    return (
        <div className='
            flex justify-center items-center p-3
            col-span-2
        '>
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
                    { task.current.description }
                </p>
            </div>
        </div>        
    );
}