import { Task as ModelTask } from '../../../../../model/model';

import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarTimeHourProps {
    task: React.MutableRefObject<ModelTask>,
    isAm: boolean,
}

export function Hours({ task, isAm }: CalendarTimeHourProps){
    const [hour, setHour] = useState(() => {
        let hours = task.current.due.getHours();
        if (!isAm) {
            return hours - 12;
        }

        return hours;
    });

    useEffect(()=>{
        let hours = hour + (isAm ? 0 : 12);
        console.log(`isAm ${isAm}`);
        console.log(`Setting hours as ${hours}`);
        
        task.current.due.setHours(hours);
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
            <option value={0}>12h</option>
        </select>
    );
}

export default Hours;