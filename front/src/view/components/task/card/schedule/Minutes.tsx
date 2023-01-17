import { Task as ModelTask } from '../../../../../model/model';

import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

interface MinutesProps {
    task: React.MutableRefObject<ModelTask>,
}


export function Minutes({ task }: MinutesProps){
    const [minute, setMinute] = useState(task.current.due.getMinutes());

    useEffect(()=>{
        task.current.due.setMinutes(minute);
    },[minute]);

    return(
        <select 
            className='cols-span-1 w-auto'    
            value={minute} onChange={(e) => setMinute(Number(e.target.value))}
        >
            <option value={0}>0 min</option>
            <option value={5}>5 min</option>
            <option value={10}>10 min</option>
            <option value={15}>15 min</option>
            <option value={20}>20 min</option>
            <option value={25}>25 min</option>
            <option value={30}>30 min</option>
            <option value={35}>35 min</option>
            <option value={40}>40 min</option>
            <option value={45}>45 min</option>
            <option value={50}>50 min</option>
            <option value={55}>55 min</option>
        </select>
    );
}

export default Minutes;