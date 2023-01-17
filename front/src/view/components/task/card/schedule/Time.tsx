import { Task as ModelTask } from '../../../../../model/model';
import Hours from './Hours';
import Minutes from './Minutes';

import React, { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';

interface TimeProps {
    task: React.MutableRefObject<ModelTask>,
}

export function Time({task}: TimeProps) {
    // false: PM true: AM
    const [isAm, setIsAm] = useState(task.current.due.getHours() < 12);

    useEffect(() => {
        let afternoon = Number(!isAm) * +12;

        let hours = task.current.due.getHours();
        console.log(`hours: ${hours}, afternoon: ${afternoon}`);

        if ((hours >= 12) && (isAm)) {
            console.log(`setting `, hours - 12);
            task.current.due.setHours(hours - 12);
        } else {
            if ((hours < 12) && !isAm) {
                console.log(`setting `, hours + 12);
                task.current.due.setHours(hours + 12);
            }
        }
    }, [isAm])

    return (
            <span className='
                w-auto h-auto
                flex flex-row items-center
            '>
                <select 
                    className='row-span-1 sm:row-auto mx-1'
                    value={isAm? "AM": "PM"} onChange={(e) => setIsAm(e.target.value.startsWith("AM"))}
                >
                    <option value={"AM"}>AM</option>
                    <option value={"PM"}>PM</option> 
                </select>
                <Hours task={ task } isAm={ isAm }/>
                <Minutes task={ task }/>
            </span>
    );
}

export default Time;