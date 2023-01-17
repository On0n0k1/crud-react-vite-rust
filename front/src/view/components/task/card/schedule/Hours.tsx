import { Task as ModelTask } from '../../../../../model/model';

import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarTimeHourProps {
    task: React.MutableRefObject<ModelTask>,
    isAm: boolean,
}

export function Hours({ task, isAm }: CalendarTimeHourProps){
    const [hour, setHour] = useState(task.current.due.getHours() - (isAm ? 0 : 12));

    useEffect(()=>{
        task.current.due.setHours(hour + (isAm ? 0 : 12));
    },[hour]);


    return(
        <select 
            className='w-auto'
            value={hour} onChange={(e) => setHour(Number(e.target.value))}
        >
            <option value={1}>1h</option>
            <option value={2}>2h</option>
            <option value={3}>3h</option>
            <option value={4}>4h</option>
            <option value={5}>5h</option>
            <option value={6}>6h</option>
            <option value={7}>7h</option>
            <option value={8}>8h</option>
            <option value={9}>9h</option>
            <option value={10}>10h</option>
            <option value={11}>11h</option>
            <option value={12}>12h</option>
        </select>
    );
}

export default Hours;